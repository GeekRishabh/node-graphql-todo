var userSchema = require('../models/user');
var jwtLib = require('../library/jwtLib');

exports.signUp = async (obj, args, context, info) => {
  console.log(obj, 'obj');
  var msg = {};
  try {
    const data = await new userSchema(obj.user).save();
    msg.msg = 'succeed';
    const token = await jwtLib.createToken(data);
    msg.token = token;
    return msg;
  } catch (err) {
    msg.msg = err.message;
  }

  return msg;
};

exports.login = async (obj, args, context, info) => {
  var msg = {};

  // get user data
  var query = userSchema.where({
    id: obj.id,
    password: obj.password
  });
  try {
    var result = await query.findOne();
    // generate token
    var token = await jwtLib.createToken(result);

    msg.msg = 'succeed';
    msg.email = result.email;
    msg.token = token;
  } catch (err) {
    console.log(err);
    msg.msg = err.message;
  }

  return msg;
};

exports.getUser = async (obj, args, context, info) => {
  // get user data

  var decoded = await jwtLib.verifyToken(obj.token);

  if (decoded) {
    var query = userSchema.where({
      uid: decoded.uid
    });
    var result;
    try {
      result = await query.findOne();
    } catch (err) {
      console.log(err);
    }
  }

  return result;
};

exports.getUsers = async (obj, args, context, info) => {
  // get users
  var result = await jwtLib.verifyToken(obj.token);
  if (result) {
    if (result.level > 0) {
      return await userSchema.find();
    } else {
      throw new Error('Unauthorized');
    }
  } else {
    throw new Error('Unknown');
  }
};

exports.checkUser = async (obj, args, context, info) => {
  // get user data
  var query = userSchema.where({
    uid: obj.uid
  });
  try {
    var result = await query.findOne();
    if (result) return true;
    else return false;
  } catch (err) {
    return false;
  }
};
