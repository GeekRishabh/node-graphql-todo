var jwt = require('jsonwebtoken');

var secret = 'Appsecret';
var tokens = [];

exports.createToken = async user => {
  var payload = {
    id: user.id,
    email: user.email
  };
  var options = {
    expiresIn: '1d'
  };
  var token = await jwt.sign(payload, secret, options);
  tokens.push(token);

  return token;
};

exports.verifyToken = async token => {
  var result;
  try {
    result = await jwt.verify(token, secret);
  } catch (err) {
    throw err;
  }
  return result;
};
