const mysql = require('mysql2');
const db = require('../config/db');

// Create a new contact
exports.createContact = (req, res) => {
  const { first_name, last_name, email, phone_number, company, job_title } = req.body;
  const query = 'INSERT INTO contacts (first_name, last_name, email, phone_number, company, job_title) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(query, [first_name, last_name, email, phone_number, company, job_title], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding contact', error: err });
    }
    res.status(201).json({ id: results.insertId, ...req.body });
  });
};

// Get all contacts
exports.getAllContacts = (req, res) => {
  const query = 'SELECT * FROM contacts';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching contacts', error: err });
    }
    res.status(200).json(results);
  });
};

// Update a contact
exports.updateContact = (req, res) => {
  const { first_name, last_name, email, phone_number, company, job_title } = req.body;
  const query = 'UPDATE contacts SET first_name = ?, last_name = ?, email = ?, phone_number = ?, company = ?, job_title = ? WHERE id = ?';
  
  db.query(query, [first_name, last_name, email, phone_number, company, job_title, req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating contact', error: err });
    }
    res.status(200).json({ id: req.params.id, ...req.body });
  });
};

// Delete a contact
exports.deleteContact = (req, res) => {
  const query = 'DELETE FROM contacts WHERE id = ?';
  
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting contact', error: err });
    }
    res.status(200).json({ message: 'Contact deleted' });
  });
};
