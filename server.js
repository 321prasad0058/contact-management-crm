const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

// Routes
app.post('/contacts', (req, res) => {
  const { first_name, last_name, email, phone_number, company, job_title } = req.body;
  const query = `INSERT INTO contacts (first_name, last_name, email, phone_number, company, job_title)
                 VALUES (?, ?, ?, ?, ?, ?)`;

  db.execute(query, [first_name, last_name, email, phone_number, company, job_title], (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, first_name, last_name, email, phone_number, company, job_title });
  });
});

app.get('/contacts', (req, res) => {
  const query = 'SELECT * FROM contacts';
  db.execute(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

app.put('/contacts/:id', (req, res) => {
  const { first_name, last_name, email, phone_number, company, job_title } = req.body;
  const query = `UPDATE contacts SET first_name = ?, last_name = ?, email = ?, phone_number = ?, company = ?, job_title = ?
                 WHERE id = ?`;

  db.execute(query, [first_name, last_name, email, phone_number, company, job_title, req.params.id], (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({ message: 'Contact updated successfully' });
  });
});

app.delete('/contacts/:id', (req, res) => {
  const query = 'DELETE FROM contacts WHERE id = ?';
  db.execute(query, [req.params.id], (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
