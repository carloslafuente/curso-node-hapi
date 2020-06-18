'use strict';

const firebase = require('firebase-admin');
const serviceAccount = require('../config/firebase.json');
const Users = require('./users');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://platzi-overflow-1f6a1.firebaseio.com/',
});

const db = firebase.database();

module.exports = {
  users: new Users(db),
};
