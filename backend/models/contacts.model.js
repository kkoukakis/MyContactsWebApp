
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Contacts = new Schema({
    fullname: {type: String, minlength:3, trim: true, required:true},
    email: {type: String, minlength:4, unique:true, trim:true, required:true},
    address: {type: String, trim: true},
    phones: [{type: Number, minlength:10}]
  }, {
      timestamps: true,
  });
  
  
  const Contact = mongoose.model('Contacts', Contacts);
  
  module.exports = Contact;