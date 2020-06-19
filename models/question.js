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
  async getLast(amount) {
    const query = await this.collection.limitToLast(amount).once('value');
    const data = query.val();
    return data;
  }
}

module.exports = Question;
