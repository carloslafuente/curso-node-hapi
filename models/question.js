'use strict';

class Question {
  constructor(db) {
    this.db = db;
    this.ref = this.db.ref('/');
    this.collection = this.ref.child('questions');
  }

  async createQuestion(data, user) {
    let question = { ...data };
    question.owner = user;
    const newQuestion = this.collection.push();
    newQuestion.set(question);

    return newQuestion.key;
  }
}

module.exports = Question;
