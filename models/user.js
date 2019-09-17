var mongoose = require('mongoose');

var user = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    select: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('user', user, 'user');
