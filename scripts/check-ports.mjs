import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function run() {
  try {
    await ssh.connect({
      host: '77.42.124.150',
      username: 'root',
      password: 'WwmMWtRdjLLK'
    });
    
    console.log('--- UFW Status ---');
    const status = await ssh.execCommand('ufw status');
    console.log(status.stdout);

    // If UFW is active and 443 is missing, add it
    if (status.stdout.includes('Status: active') && !status.stdout.includes('443')) {
      console.log('--- Adding port 443 ---');
      await ssh.execCommand('ufw allow 443/tcp');
      await ssh.execCommand('ufw allow "Nginx Full"');
      const newStatus = await ssh.execCommand('ufw status');
      console.log(newStatus.stdout);
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    ssh.dispose();
  }
}

run();
