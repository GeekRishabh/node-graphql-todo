var todoSchema = require('../models/todo');
var jwtLib = require('../library/jwtLib');
var userController = require('./user');

exports.write = async (obj, args, context, info) => {
  var msg = {};

  // verify token
  var token = obj.token;
  var decoded = await jwtLib.verifyToken(token);

  if (decoded) {
    // chekc if user exist
    var isExist = await userController.checkUser(decoded);
    if (isExist) {
      try {
        obj.todo.user_id = decoded.uid;
        obj.todo.createdAt = new Date().getTime();
        var result = await new todoSchema(obj.todo).save();
        if (result) msg.msg = 'succeed';
        else msg.msg = 'failed';
      } catch (err) {
        console.log(err);
        msg.msg = 'failed';
      }
    } else {
      msg.msg = 'user not exist';
    }
  } else {
    // failed to verify
    msg.msg = 'token is invalid';
  }

  return msg;
};

exports.update = async (obj, args, context, info) => {
  var msg = {};
  var pid = obj.pid;
  var token = obj.token;
  var newTodo = obj.todo;
  var decoded = await jwtLib.verifyToken(token);

  if (decoded) {
    try {
      var result = await todoSchema
        .findOneAndUpdate({ _id: pid, uid: decoded.uid }, newTodo)
        .exec();
      if (result) msg.msg = 'succeed';
      else msg.msg = 'failed';
    } catch (err) {
      console.log(err);
      msg.msg = 'failed';
    }
  } else {
    // failed to verify
    msg.msg = 'token is invalid';
  }

  return msg;
};

exports.delete = async (obj, args, context, info) => {
  var msg = {};

  // verify token
  var id = obj.pid;
  var token = obj.token;
  var decoded = await jwtLib.verifyToken(token);

  if (decoded) {
    try {
      var result = await todoSchema
        .deleteOne({ _id: id, uid: decoded.uid })
        .exec();
      if (result != null && result.n > 0) msg.msg = 'succeed';
      else msg.msg = 'failed';
    } catch (err) {
      console.log(err);
      msg.msg = 'failed';
    }
  } else {
    // failed to verify
    msg.msg = 'token is invalid';
  }

  return msg;
};

exports.single = async (obj, args, context, info) => {
  var query = todoSchema.where({
    _id: obj.id
  });

  try {
    return await query.findOne();
  } catch (err) {
    console.log(err);
  }
};

exports.list = async (obj, args, context, info) => {
  var msg = {};

  // verify token
  var id = obj.pid;
  var token = obj.token;
  var decoded = await jwtLib.verifyToken(token);

  if (decoded) {
    try {
      var result = await todoSchema.find();
      console.log(result, 'resultlksdvnvnb');
      if (result != null && result.n > 0) {
        msg.msg = 'succeed';
        msg.data = result;
        console.log(result, 'result');
      } else msg.msg = 'failed';
    } catch (err) {
      console.log(err);
      msg.msg = 'failed';
    }
  } else {
    // failed to verify
    msg.msg = 'token is invalid';
  }

  return msg;
};
