const mongoose = require('mongoose');
const cookingSchoolSchema = require('./cooking-school.schema.server');
const cookingSchoolModel = mongoose.model('cookingSchool',cookingSchoolSchema);
module.exports = cookingSchoolModel;