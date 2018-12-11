const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const contactUsSchema = mongoose.Schema({
    email: { type:String, required: true},
    text: { type:String, required: true},
}, {collection: "ContactUs"});

contactUsSchema.plugin(uniqueValidator);

module.exports = contactUsSchema;
