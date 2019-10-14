// Include MongoDB
const mongoose = require('mongoose');
// Include bcrypt for Password
const bcrypt = require('bcrypt');
// To Remove Deprication Warning from Console
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//Define a Schema
const Schema = mongoose.Schema;

// Create Schema for The Current Model 
export const UserSchema = new Schema({
    username: {
        type    : String,
        required: [true, "User Name is Required!"],
        max     : 15,
        min     : 3
    },
    email: {
        type    : String,
        required: [true, "Email is Required!"]
    },
    hashPassword: {
        type    : String,
        required: true
    },
    createdAt: {
        type    : Date,
        required: true,
        default : Date.now()
    },
    updatedAt: {
        type    : Date,
        required: true,
        default : Date.now()
    },
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};