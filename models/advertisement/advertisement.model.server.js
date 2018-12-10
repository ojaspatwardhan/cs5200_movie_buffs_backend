const mongoose = require('mongoose');
const advertisementSchema = require('./advertisement.schema.server');
const advertisementModel = mongoose.model('advertisements',advertisementSchema);
module.exports = advertisementModel;