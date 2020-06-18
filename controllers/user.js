'use strict';

const users = require('../models/index').users;

async function createUser(req, h) {
  let result;
  try {
    result = await users.createUser(req.payload);
  } catch (error) {
    console.error(error);
    return h.response('Problemas al crear el usuario').code(500);
  }
  return h.response(`Usuario creado ID: ${result}`).code(201);
}

async function validateUser(req, h) {
  let result;
  try {
    result = await users.validateUser(req.payload);
  } catch (error) {
    console.error(error);
    return h.response('Problemas al loguear el usuario').code(500);
  }
  return h.response(result).code(200);
}

module.exports = {
  createUser,
  validateUser,
};
