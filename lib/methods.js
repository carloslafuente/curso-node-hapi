'use strict';

const Question = require('../models/index').question;

async function setAnswerRight(questionId, answerId, user) {
  let result;
  try {
    result = await Question.setAnswerRight(questionId, answerId, user);
  } catch (error) {
    console.error(error);
    return false;
  }
  return result;
}

module.exports = {
  setAnswerRight,
};
