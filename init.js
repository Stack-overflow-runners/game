const fs = require('fs');

if (!fs.existsSync('.env')) {
  console.log('No .env file found. Copying .env.example to .env');
  fs.copyFileSync('.env.sample', '.env');
}

fs.mkdirSync('tmp/pgdata', { recursive: true });
