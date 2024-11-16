const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Create a new contact
router.post('/', contactController.createContact);

// Get all contacts
router.get('/', contactController.getAllContacts);

// Update a contact by id
router.put('/:id', contactController.updateContact);

// Delete a contact by id
router.delete('/:id', contactController.deleteContact);

module.exports = router;
