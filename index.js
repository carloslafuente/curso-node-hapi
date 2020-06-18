'use strict';

const hapi = require('@hapi/hapi');
const handlebars = require('handlebars');
const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const path = require('path');
const routes = require('./routes');

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
    server.route(routes);
    await initViews();
    await server.start();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(`Servidor corriendo en: ${server.info.uri}`);
};

init();
