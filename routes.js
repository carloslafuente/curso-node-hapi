'use strict';

const joi = require('@hapi/joi');
const site = require('./controllers/site');
const user = require('./controllers/user');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: site.home,
  },
  {
    method: 'GET',
    path: '/register',
    handler: site.register,
  },
  {
    method: 'POST',
    path: '/create-user',
    options: {
      validate: {
        payload: joi.object({
          name: joi.string().required().min(3),
          email: joi.string().email().required(),
          password: joi.string().required().min(6),
        }),
        failAction: user.failValidation,
      },
    },
    handler: user.createUser,
  },
  {
    method: 'GET',
    path: '/login',
    handler: site.login,
  },
  {
    method: 'GET',
    path: '/logout',
    handler: user.logoutUser,
  },
  {
    method: 'POST',
    path: '/login-user',
    options: {
      validate: {
        payload: joi.object({
          email: joi.string().email().required(),
          password: joi.string().required().min(6),
        }),
        failAction: user.failValidation,
      },
    },
    handler: user.validateUser,
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        index: 'index.html',
      },
    },
  },
];
