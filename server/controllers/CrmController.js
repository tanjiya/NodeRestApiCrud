// Include MongoDB
const mongoose = require('mongoose');
// Include The Contact Schema
const { ContactSchema } = require('../models/CrmModel');

// Get The CrmModel
const Contact = mongoose.model('Contact', ContactSchema, 'contact');

// Post Data
exports.addNewContact = async(req, res, next) => {
    try {
        let newContact = new Contact(req.body);
        let contact    = await newContact.save();

        res.status(200).json({ message: "Data has Suubmitted Successfully!" });
        // res.send(contact);
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    next();
};

// Get Data
exports.getAllContact = async(req, res, next) => {
    try {
        let contact = await Contact.find().exec();

        res.send(contact);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    next();
};

// Get Single Data
exports.getSingleContact = async(req, res, next) => {
    try {
        let contact = await Contact.findById(req.params.contactId).exec();

        res.send(contact);
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    next();
};

// Update Data
exports.updateContact = async(req, res, next) => {
    try {
        let updateContact = await Contact.findById(req.params.contactId).exec();
        updateContact.set(req.body);

        let contact = await updateContact.save();

        res.status(200).json({ message: "Data has Updated Successfully!" });
        // res.send(contact);
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    next();
};

// Delete Data
exports.deleteContact = async(req, res, next) => {
    try {
        let contact = await Contact.deleteOne({_id: req.params.contactId}).exec();

        res.status(200).json({ message: "Data has Deleted Successfully!" });
        // res.send(contact);
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    next();
};
