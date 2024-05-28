const express = require('express');
const cors = require('cors');
const request = require('request');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' })

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
   user: 'root',
   password: '',
   database: 'searchify_db',
 });

 db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

//app.get('/api/jobs', (req, res) => {
//  const query = 'SELECT * FROM jobs';
//  db.query(query, (err, results) => {
//    if (err) {
//      res.status(500).json({ message: err.message });
//      return;
//    }
//    res.json(results);
//  });
//});

//app.post('/api/jobs', (req, res) => {
//  const { title, description, company, location } = req.body;
//  const query = 'INSERT INTO jobs (title, description, company, location) VALUES (?, ?, ?, ?)';
//  db.query(query, [title, description, company, location], (err, results) => {
//    if (err) {
//      res.status(500).json({ message: err.message });
//      return;
//    }
//    res.status(201).json({ id: results.insertId, title, description, company, location });
//  });
//});

//app.get('/api/jobs/:id', (req, res) => {
//  const { id } = req.params;
//  const query = 'SELECT * FROM jobs WHERE id = ?';
//  db.query(query, [id], (err, results) => {
//    if (err) {
//      res.status(500).json({ message: err.message });
//      return;
//    }
//    if (results.length === 0) {
//      res.status(404).json({ message: 'Job not found' });
//      return;
//    }
//    res.json(results[0]);
//  });
//});

// Define API endpoints for users
app.post('/api/users/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, hashedPassword], (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.status(201).json({ id: results.insertId, username, email });
  });
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  
  db.query(query, [email], async (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  });
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(results[0]);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Proxy API requests
app.use('/api', async (req, res) => {
  const apiUrl = `https://api.adzuna.com${req.originalUrl.replace('/api', '')}`;
  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error in request:', error);
    res.status(500).send('Error while fetching data from Adzuna API.');
  }
});

// Route for signUp/signIn
app.get('/signUp/signIn', (req, res) => {
  res.send("<h1> Home </h1>"); // Correct the HTML
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
