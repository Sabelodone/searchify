const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const axios = require('axios');

dotenv.config({ path: './.env' });

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // your frontend URL
  credentials: true, // allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true } // Set to true if using https
}));

const port = 5000;

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PWD,
  database: process.env.DATABASE_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

app.post('/api/users/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkEmailQuery, [email], async (err, results) => {
      if (err) {
        console.error('Error checking email:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (results.length > 0) {
        return res.status(409).json({ message: 'User email already exists, please log in' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

      db.query(insertUserQuery, [username, email, hashedPassword], (err, results) => {
        if (err) {
          console.error('Error inserting user into database:', err);
          return res.status(500).json({ message: 'Database error' });
        }
        console.log('User registered successfully:', { id: results.insertId, username, email });
        res.status(201).json({ id: results.insertId, username, email });
      });
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error querying user:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      console.warn('User not found for email:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.warn('Invalid password attempt for user:', email);
      return res.status(401).json({ message: 'Invalid password' });
    }

    req.session.user = user;
    console.log('User logged in successfully:', { id: user.id, username: user.username, email: user.email });
    res.json({ user: { id: user.id, username: user.username, email: user.email } });
  });
});

app.get('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    console.log('User logged out successfully');
    res.json({ message: 'Logged out successfully' });
  });
});

app.get('/api/current-user', (req, res) => {
  if (req.session.user) {
    console.log('Current user:', req.session.user);
    res.json(req.session.user);
  } else {
    console.warn('No user logged in');
    res.status(401).json({ message: 'Not logged in' });
  }
});

app.use('/api', async (req, res) => {
  const apiUrl = `https://api.adzuna.com${req.originalUrl.replace('/api', '')}`;
  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error in request to Adzuna API:', error);
    res.status(500).send('Error while fetching data from Adzuna API.');
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('An error occurred:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
