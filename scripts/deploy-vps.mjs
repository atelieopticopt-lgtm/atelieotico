// deploy-vps.mjs — Automated VPS Production Deployment with Dynamic Product DB & Stripe
import { NodeSSH } from "node-ssh";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";

const ssh = new NodeSSH();

async function run() {
  const envDeployPath = path.resolve(process.cwd(), ".env.deploy");
  if (!fs.existsSync(envDeployPath)) {
    console.error("❌ Error: No se encontró el archivo .env.deploy");
    process.exit(1);
  }

  const envContent = fs.readFileSync(envDeployPath, "utf-8");
  
  // Extract values
  const vpsPassMatch = envContent.match(/VPS_PASSWORD=(.+)/);
  const password = vpsPassMatch ? vpsPassMatch[1].trim() : "";

  if (!password) {
    console.error("❌ Error: VPS_PASSWORD no encontrado en .env.deploy");
    process.exit(1);
  }

  const host = "77.42.124.150";
  const username = "root";
  const remoteDir = "/var/www/atelieotico.com";
  const localDist = path.resolve(process.cwd(), "dist");

  console.log("🚀 Compilando sitio con catálogo completo de 370 productos, Stripe Checkout y Admin...");
  try {
    execSync("npm run build", { stdio: "inherit" });
  } catch (e) {
    console.error("❌ Falló la compilación de Astro:", e.message);
    process.exit(1);
  }

  if (!fs.existsSync(localDist)) {
    console.error(`❌ El directorio de distribución ${localDist} no existe.`);
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
      readyTimeout: 30000,
      keepaliveInterval: 5000
    });
    console.log("✅ Conexión SSH exitosa.");

    console.log(`📁 Verificando directorio remoto ${remoteDir}...`);
    await ssh.execCommand(`mkdir -p ${remoteDir} ${remoteDir}/server ${remoteDir}/server/data ${remoteDir}/data`);

    console.log(`📤 Subiendo paquete web a ${remoteDir}...`);
    await ssh.putFile(tarFile, "/tmp/dist.tar.gz");
    await ssh.execCommand(`tar -xzf /tmp/dist.tar.gz -C ${remoteDir} && rm -f /tmp/dist.tar.gz`);

    console.log("📤 Subiendo servidor Stripe Backend, Base de Datos de Productos y configuración .env...");
    const serverFile = path.resolve(process.cwd(), "server.mjs");
    if (fs.existsSync(serverFile)) {
      await ssh.putFile(serverFile, `${remoteDir}/server/server.mjs`);
    }
    const envLocalFile = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envLocalFile)) {
      await ssh.putFile(envLocalFile, `${remoteDir}/server/.env`);
    }

    const dbLocalFile = path.resolve(process.cwd(), "data/products-db.json");
    if (fs.existsSync(dbLocalFile)) {
      console.log("💾 Subiendo base de datos de productos (products-db.json)...");
      await ssh.putFile(dbLocalFile, `${remoteDir}/server/data/products-db.json`);
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

    # API Proxy for Stripe Payment Service & Dynamic Products DB
    location /api/ {
        proxy_pass http://127.0.0.1:4242;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Static Web Pages with Automatic Cache-Busting
    location / {
        try_files $uri $uri/ $uri/index.html /index.html =404;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # Static Assets
    location ~* \\.(css|js|svg|png|jpg|jpeg|gif|ico|woff|woff2)$ {
        expires 1h;
        add_header Cache-Control "public, no-cache, must-revalidate";
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

    console.log("\n🎉 ¡DESPLIEGUE COMPLETO DE STRIPE CHECKOUT, BASE DE DATOS Y APIS EN EL VPS!");
    console.log(`🌐 Tienda: https://atelieotico.com`);
    console.log(`💳 Checkout: https://atelieotico.com/checkout`);
    console.log(`⚡ API Status: https://atelieotico.com/api/config`);
    console.log(`📦 Products API: https://atelieotico.com/api/products`);
    console.log(`🔐 Admin: https://atelieotico.com/admin`);

  } catch (err) {
    console.error("❌ Error durante el despliegue:", err.message);
    process.exit(1);
  } finally {
    ssh.dispose();
    if (fs.existsSync(tarFile)) {
      try { fs.unlinkSync(tarFile); } catch(e) {}
    }
  }
}

run();
