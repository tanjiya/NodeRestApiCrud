// Include Express
const express = require('express');
// Include Express Router
const router = express.Router();
// Get Essential Methods from CrmController
const Contact = require('../controllers/CrmController');
// Get Essential Methods from UserController
const User = require('../controllers/UserController');

// Send Post Request
router.post('/contact/create', User.loginRequired, Contact.addNewContact );

// Send Get Request
router.get('/contact/', User.loginRequired, Contact.getAllContact);

// Send Single Data Get Request
router.get('/contact/:contactId', User.loginRequired, Contact.getSingleContact);

//  Send Update Request
router.put('/contact/:contactId', User.loginRequired, Contact.updateContact);

// Send Delete Request
router.delete('/contact/:contactId', User.loginRequired, Contact.deleteContact);

// Export Router to Another File
module.exports = router;
