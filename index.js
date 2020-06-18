'use strict';

const hapi = require('@hapi/hapi');
const handlebars = require('handlebars');
const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const path = require('path');
const routes = require('./routes');
const site = require('./controllers/site');

const server = hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public'),
    },
  },
});

const declarePlugins = async () => {
  await server.register(inert);
  await server.register(vision);
};

const initViews = async () => {
  server.views({
    engines: {
      hbs: handlebars,
    },
    relativeTo: __dirname,
    path: 'views',
    layout: true,
    layoutPath: 'views',
  });
};

const init = async () => {
  try {
    await declarePlugins();
    // Definiendo las opciones de estado de las cokies en una variable user
    server.state('user', {
      ttl: 1000 * 60 * 60 * 24 * 7,
      isSecure: process.env.NODE_ENV === 'prod',
      encoding: 'base64json',
    });

    server.route(routes);
    await initViews();
    server.ext('onPreResponse', site.fileNotFound);
    await server.start();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(`Servidor corriendo en: ${server.info.uri}`);
};

process.on('unhandledRejection', (error) => {
  console.error(`[onhandledRejection]: ${error.message}`, error);
});

process.on('unhandledException', (error) => {
  console.error(`[onhandledException]: ${error.message}`, error);
});

init();
