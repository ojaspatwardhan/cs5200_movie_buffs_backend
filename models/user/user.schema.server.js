const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String, unique: false},
    address_1: {type: String},
    address_2: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: Number}
}, {collection: "users"});

userSchema.plugin(uniqueValidator);

module.exports = userSchema;
