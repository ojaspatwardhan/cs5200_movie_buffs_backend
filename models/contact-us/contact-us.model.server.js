const mongoose = require('mongoose');
const contactUsSchema = require('./contact-us.schema.server');
const contactUsModel = mongoose.model('ContactUs',contactUsSchema);
module.exports = contactUsModel;