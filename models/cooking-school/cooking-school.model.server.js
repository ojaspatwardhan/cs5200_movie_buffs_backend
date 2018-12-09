const mongoose = require('mongoose');
const cookingSchoolSchema = require('./cooking-school.schema.server');
const cookingSchoolModel = mongoose.model('cooking-school',cookingSchoolSchema);
module.exports = cookingSchoolModel;