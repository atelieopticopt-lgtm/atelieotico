import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function run() {
  try {
    await ssh.connect({
      host: '77.42.124.150',
      username: 'root',
      password: 'WwmMWtRdjLLK'
    });
    
    console.log('--- Netstat ---');
    const status = await ssh.execCommand('netstat -tulpn | grep nginx');
    console.log(status.stdout);

    console.log('--- Nginx Config ---');
    const conf = await ssh.execCommand('cat /etc/nginx/sites-available/atelieotico.com');
    console.log(conf.stdout);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    ssh.dispose();
  }
}

run();
