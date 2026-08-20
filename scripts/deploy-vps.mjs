import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { NodeSSH } from "node-ssh";

const ssh = new NodeSSH();

async function run() {
  const envPath = path.resolve(process.cwd(), ".env.deploy");
  if (!fs.existsSync(envPath)) {
    console.error("❌ Error: No se encontró el archivo .env.deploy");
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, "utf-8");
  
  // Extract values
  const vpsPassMatch = envContent.match(/VPS_PASSWORD=(.+)/);
  const password = vpsPassMatch ? vpsPassMatch[1].trim() : "";

  const supaUrlMatch = envContent.match(/PUBLIC_SUPABASE_URL=(.+)/);
  const supabaseUrl = supaUrlMatch ? supaUrlMatch[1].trim() : "";

  const supaKeyMatch = envContent.match(/PUBLIC_SUPABASE_ANON_KEY=(.+)/);
  const supabaseKey = supaKeyMatch ? supaKeyMatch[1].trim() : "";

  if (!password || password === "tu_contraseña_aqui") {
    console.error("❌ Error: Por favor abre .env.deploy y coloca tu contraseña de VPS.");
    process.exit(1);
  }

  // Read existing .env or create if missing
  const localEnvFile = path.resolve(process.cwd(), ".env");
  let localEnv = "";
  if (fs.existsSync(localEnvFile)) {
    localEnv = fs.readFileSync(localEnvFile, "utf-8");
  } else {
    localEnv = `# ATELIÊ ÓTICO ENVIRONMENT\nPUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51U6ePTA4omOSLMnkqJ97sAVhZt1L3YUHNSn0ZehsXQVBDq3k4gTjYRGjDVu4DELheXIR79Wm9XVhTJdtTsWOeNZq00z8rLeAyn\nPORT=4242\nADMIN_EMAIL=geral@atelieotico.com\n`;
    if (supabaseUrl && supabaseUrl !== "pega_tu_supabase_url_aqui" && supabaseUrl.startsWith("http")) {
      localEnv += `PUBLIC_SUPABASE_URL=${supabaseUrl}\n`;
    }
    if (supabaseKey && supabaseKey !== "pega_tu_supabase_anon_key_aqui") {
      localEnv += `PUBLIC_SUPABASE_ANON_KEY=${supabaseKey}\n`;
    }
    fs.writeFileSync(localEnvFile, localEnv, "utf-8");
  }

  console.log("🚀 Compilando sitio con catálogo completo de 370 productos, Stripe Checkout y Admin...");
  execSync("npm run build", { stdio: "inherit" });

  const host = "77.42.124.150";
  const username = "root";
  const remoteDir = "/var/www/atelieotico.com";
  const localDist = path.resolve(process.cwd(), "dist");

  if (!fs.existsSync(localDist)) {
    console.error("❌ Error: La carpeta dist/ no existe.");
    process.exit(1);
  }

  console.log("📦 Comprimiendo paquete dist/ para transferencia de alta velocidad...");
  const tarFile = path.resolve(process.cwd(), "dist.tar.gz");
  execSync(`tar -czf "${tarFile}" -C "${localDist}" .`);

  console.log(`🚀 Conectando a ${username}@${host}...`);
  try {
    await ssh.connect({
      host,
      username,
      password,
      tryKeyboard: true,
    });
    console.log("✅ Conexión SSH exitosa.");

    console.log(`📁 Verificando directorio remoto ${remoteDir}...`);
    await ssh.execCommand(`mkdir -p ${remoteDir} ${remoteDir}/server ${remoteDir}/data`);

    console.log(`📤 Subiendo paquete web a ${remoteDir}...`);
    await ssh.putFile(tarFile, "/tmp/dist.tar.gz");
    await ssh.execCommand(`tar -xzf /tmp/dist.tar.gz -C ${remoteDir} && rm /tmp/dist.tar.gz`);

    console.log("📤 Subiendo servidor Stripe Backend y configuración .env...");
    const serverFile = path.resolve(process.cwd(), "server.mjs");
    if (fs.existsSync(serverFile)) {
      await ssh.putFile(serverFile, `${remoteDir}/server/server.mjs`);
    }
    const envLocalFile = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envLocalFile)) {
      await ssh.putFile(envLocalFile, `${remoteDir}/server/.env`);
    }

    console.log("⚡ Configurando servicio Node.js Stripe en el VPS...");
    const serviceContent = `[Unit]
Description=Atelie Otico Stripe Payment Microservice
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=${remoteDir}/server
ExecStart=/usr/bin/node ${remoteDir}/server/server.mjs
Restart=always
RestartSec=5
EnvironmentFile=${remoteDir}/server/.env

[Install]
WantedBy=multi-user.target
`;
    await ssh.execCommand(`echo '${serviceContent}' > /etc/systemd/system/atelie-stripe.service`);
    await ssh.execCommand("systemctl daemon-reload && systemctl enable atelie-stripe && systemctl restart atelie-stripe");

    console.log("🔧 Verificando configuración Nginx para proxy /api/...");
    const nginxConf = `server {
    listen 80;
    server_name atelieotico.com www.atelieotico.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name atelieotico.com www.atelieotico.com;

    ssl_certificate /etc/letsencrypt/live/atelieotico.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/atelieotico.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    root /var/www/atelieotico.com;
    index index.html;

    # API Proxy for Stripe Payment Service
    location /api/ {
        proxy_pass http://127.0.0.1:4242;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Static Web Pages
    location / {
        try_files $uri $uri/ $uri/index.html /index.html =404;
    }

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;
}
`;
    await ssh.execCommand(`echo '${nginxConf}' > /etc/nginx/sites-available/atelieotico.com`);
    await ssh.execCommand("nginx -t && systemctl reload nginx");

    console.log("🔧 Ajustando permisos en el servidor...");
    await ssh.execCommand(`chmod -R 755 ${remoteDir}`);

    console.log("\n🎉 ¡DESPLIEGUE COMPLETO DE STRIPE CHECKOUT Y APIS EN EL VPS!");
    console.log(`🌐 Tienda: https://atelieotico.com`);
    console.log(`💳 Checkout: https://atelieotico.com/checkout`);
    console.log(`⚡ API Status: https://atelieotico.com/api/config`);
    console.log(`🔐 Admin: https://atelieotico.com/admin`);

  } catch (err) {
    console.error("❌ Error durante el despliegue:", err.message);
    process.exit(1);
  } finally {
    ssh.dispose();
  }
}

run();
