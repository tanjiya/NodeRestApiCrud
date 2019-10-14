// Include Express
const express = require('express');
// Include Body Parser to Send Data/Object through HTTP
const bodyParser = require('body-parser');
// Include MongoDB
const mongoose = require('mongoose');
// Include JSON Web Token
const jwt = require('jsonwebtoken');
// Include UserModel
const User = require('./server/models/UserModel');

// Include CrmRoutes
const CrmRoutes = require('./server/routes/CrmRoutes');
// Include UserRoutes
const UserRoutes = require('./server/routes/UserRoutes');

// Initialize Our App
const app = express();

app.get('/', (req, res, next) => {
    res.send('Hello from Node App!');
});

// Connet to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/crmdb', (err) => {
    if(!err)
    {
        console.log('MongoDB has connected successfully!');
    } else {
        console.log('The error: ' + err);
    }
});

// BodyParser Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// JWT Setup
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        }); 
    } else {
        req.user = undefined;
        next();
    }
});

// Need to Add Routes after Middleware
app.use('/api', CrmRoutes);
app.use('/api/user', UserRoutes);

// Get All Static Data
const staticData = express.static('public/images');
app.use(staticData);

// Declare The Server Port
const server_port = process.env.PORT || 3000;
// Listening to Port to Serve The Web App
app.listen(server_port, (err) => {
    if(!err)
    {
        console.log("Server Has Started");
    } else {
        console.log(`Error: ${err}`);
    }
});

// Export Main App File
module.export = app;
