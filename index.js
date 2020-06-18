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

const initViews = async () => {
  server.views({
    engines: {
      hbs: handlebars,
    },
    // Declaramos la carpeta de las vistas, estara en la misma ruta que este archivo en views
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
    server.route(routes);
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

// El objeto request nos permite obtener datos de la petición recibida desde el cliente. El método pasado como parámetro para la creación de este objeto define si trabajaremos con GET o POST.

// Proipiedades del request:

// request.path
// request.method
// request.get
// request.payload: es en esta propiedad donde recibimos los datos enviados con el método POST.
// Ciclo de vida del objeto request, se refiere a los eventos que suceden durante la carga, existencia y descarga del objeto:

// OnRequest
// OnPreAuth
// OnCredentials
// OnPostAuth
// OnPreHandler
// OnPostHandler
// OnPreResponse
// Más información sobre el ciclo de vida del objeto request en el repositorio oficial del proyecto: Link

// Código: Definimos rutas GET y POST para registrar usuarios y recibir
// parámetros en el request.
