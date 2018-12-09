const mongoose = require('mongoose');
const recipeSchema = require('./recipe.schema.server');
const recipeModel = mongoose.model('Recipe',recipeSchema);
module.exports = recipeModel;
