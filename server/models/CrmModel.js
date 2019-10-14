// Include MongoDB
const mongoose = require('mongoose');
// To Remove Deprication Warning from Console
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//Define a Schema
const Schema = mongoose.Schema;

// Create Schema for The Current Model 
exports.ContactSchema = new Schema({
    firstName: {
        type    : String,
        required: [true, "First Name is Required!"],
        max     : 50,
        min     : 3
    },
    lastName: {
        type    : String,
        required: [true, "Last Name is Required!"],
        max     : 50,
        min     : 3
    },
    email: {
        type    : String,
        required: [true, "Email is Required!"],
    },
    company: {
        type    : String,
        required: [true, "Company Name is Required"],
        max     : 30,
        min     : 8
    },
    phone: {
        type    : Number,
        required: [true, "Phone Number is Required"],
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
