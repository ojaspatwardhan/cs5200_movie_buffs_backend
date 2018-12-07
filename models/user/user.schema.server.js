const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String, unique: false}
}, {collection: "users"});

userSchema.plugin(uniqueValidator);

module.exports = userSchema;
