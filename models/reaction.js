const mongoose = require('mongoose');
const { Schema } = mongoose;
const { format } = require('date-fns');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(), // Corrected default for reactionId
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => format(timestamp, "yyyy-MM-dd HH:mm:ss"), // Correctly use format directly
  },
}, {
  toJSON: {
    getters: true,
    virtuals: true, // Ensure virtuals are included in toJSON
  },
  toObject: {
    getters: true,
    virtuals: true, // Also ensure virtuals are included when converting to objects
  },
  id: false,
});

// Note that we don't create a model for reactions since it's a subdocument.
module.exports = reactionSchema;
