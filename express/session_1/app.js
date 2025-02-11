const express = require('express');
const https = require('node:https');
const { readFileSync, writeFileSync } = require('node:fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log(`host=${req.hostname}, ip=${req.ip}`);
  res.send(`Hello world from ${req.url}!`);
});

app.get('/users', (req, res) => {
  res.json(JSON.parse(readFileSync('./data/users.json', 'utf8')));
});

app.put('/users/reset', (req, res) => {
  https.get('https://jsonplaceholder.typicode.com/users', res1 => {
    res1.setEncoding('utf8');
    let rawData = '';
    res1.on('data', (chunk) => { rawData += chunk; });
    res1.on('end', () => {
      try {
        writeFileSync(
          './data/users.json',
          rawData,
          'utf8',
        );
      } catch (e) {
        console.error(e.message);
      }
    });
  });
  res.send('Reset users successfully');
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const reqUser = JSON.parse(readFileSync('./data/users.json', 'utf8')).find(e => e['id'] === id);
  reqUser
    ? res.json(reqUser)
    : res.status(404).json({ message: 'User not found' });
});

app.post('/users', (req, res) => {
  const users = JSON.parse(readFileSync('./data/users.json', 'utf8'));
  const ids = users.map(e => e['id']).sort((a, b) => b - a);

  const newUser = { ...req.body, id: ids[0] + 1 };
  users.push(newUser);

  writeFileSync(
    './data/users.json',
    JSON.stringify(users),
    'utf8',
  );

  res.send(`Added user successfully`);
});

app.put('/users/:id', (req, res) => {
  const reqId = parseInt(req.params.id);
  const users = JSON.parse(readFileSync('./data/users.json', 'utf8'));

  const reqUserIdx = users.findIndex(e => e.id === reqId);
  if (reqUserIdx < 0) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  users[reqUserIdx] = {
    id: users[reqUserIdx].id,
    ...req.body,
  };
  writeFileSync(
    './data/users.json',
    JSON.stringify(users),
    'utf8',
  );

  res.json({ message: `User ${reqId} updated successfully` });
});

app.delete('/users/:id', (req, res) => {
  const reqId = parseInt(req.params.id);
  const users = JSON.parse(readFileSync('./data/users.json', 'utf8'));

  const reqUserIdx = users.findIndex(e => e.id === reqId);
  if (reqUserIdx < 0) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  users.splice(reqUserIdx, 1);
  writeFileSync(
    './data/users.json',
    JSON.stringify(users),
    'utf8',
  );

  res.json({ message: `User ${reqId} deleted successfully` });
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
