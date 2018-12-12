const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const advertisementSchema = mongoose.Schema({
    name: { type:String, required: true },
    image: { type:String, required: true },
    createdBy: { type: String, required: true }
}, {collection: "advertisements"});

advertisementSchema.plugin(uniqueValidator);

module.exports = advertisementSchema;
