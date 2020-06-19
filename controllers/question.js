'use strict';

const Question = require('../models/index').question;

async function createQuestion(req, h) {
  if (!req.state.user) {
    return h.redirect('/login');
  }
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
  if (!req.state.user) {
    return h.redirect('/login');
  }
  let result;
  try {
    result = await Question.answerAQuestion(req.payload, req.state.user);
    console.log(`Respuesta creada: ${result}`);
  } catch (error) {
    console.error(error);
  }
  return h.redirect(`/question/${req.payload.id}`);
}

async function setAnswerRight(req, h) {
  if (!req.state.user) {
    return h.redirect('/login');
  }
  let result;
  try {
    result = await req.server.methods.setAnswerRight(
      req.params.questionId,
      req.params.answerId,
      req.state.user
    );
  } catch (error) {
    console.error(error);
  }
  return h.redirect(`/question/${req.params.questionId}`);
}

module.exports = {
  createQuestion,
  answerQuestion,
  setAnswerRight,
};
