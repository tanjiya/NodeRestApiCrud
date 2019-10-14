// Include MongoDB
const mongoose = require('mongoose');
// Include bcrypt for Password
const bcrypt = require('bcrypt');
// Include JSON Web Token
const jwt = require('jsonwebtoken');

// Include User Schema
const { UserSchema } = require('../models/UserModel');

// Mapping The Schema with Database
const User = mongoose.model('User', UserSchema, 'user');

// Register a User
exports.registerUser = async(req, res, next) => {
    try {
        let newUser = new User(req.body);
        newUser.hashPassword = bcrypt.hashSync(req.body.password, 20);

        let user = await newUser.save();

        user.hashPassword = undefined;
        return res.json(user);
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

    next();
};

// User Login
exports.userLogin = async(req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if(!user.comparePassword(req.body.password, user.hashPassword)) {
            res.status(401).json({message: 'Authentication Failed! Please Put The Correct Passsword'});
        }
        else {
            return res.json({
                token: jwt.sign({
                    email: user.email,
                    username: user.username,
                    _id: user.id
                }, 'RESTFULAPIs')
            });
        }
        
    } catch (err) {
        res.status(401).json({ message: 'Authentication Failed! No User Found.' });
    }

    next();
};

exports.loginRequired = async(req, res, next) => {
    try {
        if(req.user) {
            next();
        }
    } catch (error) {
        res.status(401).json({ message: 'Unatuhorized User!' });
    }
};
