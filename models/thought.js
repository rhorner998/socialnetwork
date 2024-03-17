const mongoose = require('mongoose');
const { Schema } = mongoose;
const reactionSchema = require('./reaction');
const { format } = require('date-fns');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => format(timestamp, "yyyy-MM-dd HH:mm:ss") // Direct use
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
}, {
  toJSON: {
    getters: true,
    virtuals: true, // Ensure virtuals are included in toJSON
  },
  toObject: {
    getters: true,
    virtuals: true, // Ensure virtuals are included when converting to objects
  },
  id: false
});

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;
