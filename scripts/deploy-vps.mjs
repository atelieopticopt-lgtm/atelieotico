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

  // Create .env for Astro build
  let localEnv = "";
  if (supabaseUrl && supabaseUrl !== "pega_tu_supabase_url_aqui" && supabaseUrl.startsWith("http")) {
    localEnv += `PUBLIC_SUPABASE_URL=${supabaseUrl}\n`;
  }
  if (supabaseKey && supabaseKey !== "pega_tu_supabase_anon_key_aqui") {
    localEnv += `PUBLIC_SUPABASE_ANON_KEY=${supabaseKey}\n`;
  }
  fs.writeFileSync(path.resolve(process.cwd(), ".env"), localEnv, "utf-8");

  console.log("🚀 Compilando sitio con catálogo completo de 370 productos y Admin Dashboard...");
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
    await ssh.execCommand(`mkdir -p ${remoteDir}`);

    console.log(`📤 Subiendo paquete comprimido a ${remoteDir}...`);
    await ssh.putFile(tarFile, "/tmp/dist.tar.gz");

    console.log("⚡ Extrayendo archivos en el servidor...");
    await ssh.execCommand(`tar -xzf /tmp/dist.tar.gz -C ${remoteDir} && rm /tmp/dist.tar.gz`);

    console.log("✅ Archivos desplegados con éxito.");

    console.log("🔧 Ajustando permisos en el servidor...");
    await ssh.execCommand(`chmod -R 755 ${remoteDir}`);
    await ssh.execCommand(`chown -R www-data:www-data ${remoteDir} 2>/dev/null || true`);
    
    // Solo recargamos nginx, no sobrescribimos el certificado SSL
    await ssh.execCommand("systemctl reload nginx");

    console.log("\n🎉 ¡DESPLIEGUE DEL CATÁLOGO COMPLETO Y ADMIN COMPLETADO CON ÉXITO!");
    console.log(`🌐 Visita: https://atelieotico.com`);
    console.log(`🔐 Admin: https://atelieotico.com/admin`);

  } catch (err) {
    console.error("❌ Error durante el despliegue:", err.message);
    process.exit(1);
  } finally {
    ssh.dispose();
  }
}

run();
