const fs = require('fs');

if (!fs.existsSync('.env')) {
  console.log('No .env file found. Copying .env.example to .env');
  fs.copyFileSync('.env.sample', '.env');
}
if (!fs.existsSync('tmp')) {
  console.log('No tmp folder found. Creating tmp folder');
  fs.mkdirSync('tmp/pgdata', { recursive: true });
}
