// server.js
const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express();

app.use(cors());

const port = 5000;

app.use('/api', (req, res) => {
  const apiUrl = `https://api.adzuna.com${req.originalUrl.replace('/api', '')}`;
  req.pipe(request(apiUrl)).pipe(res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
