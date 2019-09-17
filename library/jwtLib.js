var jwt = require('jsonwebtoken');

exports.createToken = async user => {
  var payload = {
    id: user.id,
    email: user.email
  };
  var options = {
    expiresIn: process.env.JWT_EXPIRES_IN
  };
  var token = await jwt.sign(payload, process.env.APP_SECRET, options);

  return token;
};

exports.verifyToken = async token => {
  var result;
  try {
    result = await jwt.verify(token, process.env.APP_SECRET);
  } catch (err) {
    throw err;
  }
  return result;
};
