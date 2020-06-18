'use strict';

const hapi = require('@hapi/hapi');
const handlebars = require('handlebars');
const vision = require('@hapi/vision');
const inert = require('@hapi/inert');
const path = require('path');

const server = hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  // Se declara la ruta de la carpeta de los archivos estaticos
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

const initRoutes = async () => {
  server.route({
    method: 'GET',
    path: '/home',
    handler: (req, h) => {
      return h.view('index', {
        title: 'Home',
      });
    },
  });
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        index: ['index.html'],
      },
    },
  });
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
    // Registrar los plugins que HAPI usara
    await declarePlugins();
    // Iniciamos las rutas
    await initRoutes();
    // Iniciamos las vistas
    await initViews();
    // Iniciamos el servidor
    await server.start();
  } catch (error) {
    console.error(error);
    // Salir de nodejs con un codigo de error (1), (0) es un codigo de exito
    process.exit(1);
  }
  console.log(`Servidor corriendo en: ${server.info.uri}`);
};

init();
