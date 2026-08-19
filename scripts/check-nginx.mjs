import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function run() {
  try {
    await ssh.connect({
      host: '77.42.124.150',
      username: 'root',
      password: 'WwmMWtRdjLLK'
    });
    
    console.log('--- Nginx Status ---');
    const status = await ssh.execCommand('systemctl status nginx');
    console.log(status.stdout);
    if (status.stderr) console.error(status.stderr);

    console.log('--- Nginx config test ---');
    const test = await ssh.execCommand('nginx -t');
    console.log(test.stdout);
    if (test.stderr) console.error(test.stderr);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    ssh.dispose();
  }
}

run();
