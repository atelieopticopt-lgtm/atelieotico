import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function run() {
  try {
    console.log('Conectando a root@77.42.124.150...');
    await ssh.connect({
      host: '77.42.124.150',
      username: 'root',
      password: 'WwmMWtRdjLLK'
    });
    console.log('✅ SSH exitoso. Instalando Certbot...');

    // Install certbot if not present
    await ssh.execCommand('apt-get update && apt-get install -y certbot python3-certbot-nginx');
    
    console.log('Ejecutando certbot para atelieotico.com y www.atelieotico.com...');
    const result = await ssh.execCommand('certbot --nginx -d atelieotico.com -d www.atelieotico.com --non-interactive --agree-tos -m admin@atelieotico.com --redirect');
    
    console.log(result.stdout);
    if (result.stderr) console.error(result.stderr);

    console.log('✅ SSL Let\'s Encrypt instalado y Nginx recargado.');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    ssh.dispose();
  }
}

run();
