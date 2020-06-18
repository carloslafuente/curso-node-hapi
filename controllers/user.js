'use strict';

const users = require('../models/index').users;
const boom = require('@hapi/boom');

async function createUser(req, h) {
  let result;
  try {
    result = await users.createUser(req.payload);
  } catch (error) {
    console.error(error);
    return h.view('register', {
      titulo: 'Registro',
      error: 'Error al crear el usuario',
    });
  }
  return h.view('register', {
    titulo: 'Home',
    success: 'Usuario creado exitosamente',
  });
}

async function validateUser(req, h) {
  let result;
  try {
    result = await users.validateUser(req.payload);
    if (!result) {
      //   return h.response('Email o contraseña incorrecta').code(401);
      return h.view('login', {
        titulo: 'Login',
        error: 'Email o contraseña incorrecta',
      });
    }
  } catch (error) {
    console.error(error);
    // return h.response('Problemas al loguear el usuario').code(500);
    return h.view('login', {
      titulo: 'Login',
      error: 'Problemas al loguear el usuario',
    });
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
