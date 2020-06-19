'use strict';

const Question = require('../models/index').question;

async function createQuestion(req, h) {
  let result;
  try {
    result = await Question.createQuestion(req.payload, req.state.user);
    console.log(`Pregunta creada con el ID: ${result}`);
  } catch (error) {
    console.error(error);
    return h
      .view('ask', {
        title: 'Crear Pregunta',
        error: 'Error al crear la pregunta',
      })
      .code(500)
      .takeover();
  }
  return h.response(`Pregunta creada con el ID ${result}`);
}

async function answerQuestion(req, h) {
  let result;
  try {
    result = await Question.answerAQuestion(req.payload, req.state.user);
    console.log(`Respuesta creada: ${result}`);
  } catch (error) {
    console.error(error);
  }
  return h.redirect(`/question/${req.payload.id}`);
}

module.exports = {
  createQuestion,
  answerQuestion,
};
