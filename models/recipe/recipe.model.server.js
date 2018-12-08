const mongoose = require('mongoose');
const recipeSchema = require('./user.schema.server');
const recipeModel = mongoose.model('Recipe',recipeSchema);
module.exports = recipeModel;