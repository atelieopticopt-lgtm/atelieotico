import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function run() {
  try {
    await ssh.connect({
      host: '77.42.124.150',
      username: 'root',
      password: 'WwmMWtRdjLLK'
    });
    
    console.log('--- Certbot Logs ---');
    const logs = await ssh.execCommand('cat /var/log/letsencrypt/letsencrypt.log | tail -n 50');
    console.log(logs.stdout);
    if (logs.stderr) console.error(logs.stderr);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    ssh.dispose();
  }
}

run();
