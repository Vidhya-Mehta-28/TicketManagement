const http = require('http');

function post(path, data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body }));
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

(async () => {
  try {
    console.log('Registering user...');
    const reg = await post('/auth/register', { username: 'tester', email: 'tester@example.com', password: 'pass123' });
    console.log('Register response:', reg.statusCode, reg.body);

    console.log('Logging in...');
    const login = await post('/auth/login', { email: 'tester@example.com', password: 'pass123' });
    console.log('Login response:', login.statusCode, login.body);
  } catch (err) {
    console.error('Request error:', err);
  }
})();
