const mongoose = require('mongoose');
const commentSchema = require('./comment.schema.server');
const commentModel = mongoose.model('Comment',commentSchema);

module.exports = commentModel;
