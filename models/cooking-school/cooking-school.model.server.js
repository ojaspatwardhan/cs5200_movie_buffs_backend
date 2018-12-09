const mongoose = require('mongoose');
const cookingSchoolSchema = require('./cooking-school.schema.server');
const cookingSchoolModel = mongoose.model('CookingSchool',cookingSchoolSchema);
module.exports = cookingSchoolModel;