var mongoose = require('mongoose');

var todo = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('todo', todo, 'todo');
