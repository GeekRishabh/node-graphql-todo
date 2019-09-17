var express = require('express');
var router = express.Router();
var graphqlHTTP = require('express-graphql');
var { buildSchema, GraphQLObjectType, GraphQLSchema } = require('graphql');
var graphql = require('graphql');
var userController = require('../controller/user');
var todoController = require('../controller/todo');

var schema = buildSchema(`

    interface Result {
        msg: String
    }

    input UserInfo {
        id: String
        password: String
        email: String
        name: String
    }

    input TodoInput {
        title: String
        completed: Boolean
    }

    type User {
        id: ID
        email: String
        level: Int
    }

    type SingUpResult implements Result {
        msg: String
        token: String
    }

    type LoginResult implements Result {
        msg: String
        email: String
        token: String
    }

    type WriteResult implements Result {
        msg: String
    }

    type Todo {
        id: ID
        user_id: String
        title: String
        completed: Boolean
        createdAt: String
    }
    
    type Query {
        getUserInfo(token: String): User
        getUsers(token: String): [User]
        getTodos(token: String): [Todo]
        getTodo(id: ID!,token: String!): Todo
    }

    type Mutation {
        signUp(user: UserInfo): SingUpResult
        login(email: String, password: String): LoginResult
        writeTodo(todo: TodoInput, token: String!): WriteResult
        deleteTodo(id: ID, token: String!): WriteResult
        updateTodo(id: ID, token: String!, todo: TodoInput): WriteResult
    }
`);

// Mapping between schema and function
var root = {
  signUp: userController.signUp,
  login: userController.login,
  getUserInfo: userController.getUser,
  getUsers: userController.getUsers,
  writeTodo: todoController.write,
  updateTodo: todoController.update,
  deleteTodo: todoController.delete,
  getTodos: todoController.list,
  getTodo: todoController.single
};

router.use(
  '/',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    customFormatErrorFn: err => {
      return { message: err.message };
    }
  })
);

module.exports = router;
