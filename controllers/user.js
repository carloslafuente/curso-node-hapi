'use strict';

const users = require('../models/index').users;
const boom = require('@hapi/boom');

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
    if (!result) {
      return h.response('Email o contraseña incorrecta').code(401);
    }
  } catch (error) {
    console.error(error);
    return h.response('Problemas al loguear el usuario').code(500);
  }
  // Seteando las credenciales en la cokie del usuario
  return h.redirect('/').state('user', {
    name: result.name,
    email: result.email,
  });
}

function logoutUser(req, h) {
  return h.redirect('/login').unstate('user');
}

function failValidation(req, h, error) {
  console.log('Aqui');
  return boom.badRequest('Fallo la validacion', req.payload);
}

module.exports = {
  createUser,
  validateUser,
  logoutUser,
  failValidation,
};
