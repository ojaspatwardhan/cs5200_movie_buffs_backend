const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');
const userModel = mongoose.model('User',userSchema);
module.exports = userModel;