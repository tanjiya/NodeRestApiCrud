// Include Express
const express = require('express');
// Include Express Router
const router = express.Router();
// Get Essential Methods from UserController
const User = require('../controllers/UserController');

// Send User Post Request
router.post('/signup', User.registerUser);

// Send User Login Request
router.post('/login', User.userLogin);

// Export Router to Another File
module.exports = router;
