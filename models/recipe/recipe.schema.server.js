const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const recipeSchema = mongoose.Schema({
    title: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    instructions: {type: String},
    readyInMinutes: {type: Number},
    servings: {type: Number},
    extendedIngredients: [{
        type: String
    }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, {collection: "recipes"});

recipeSchema.plugin(uniqueValidator);

module.exports = recipeSchema;
