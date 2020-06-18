'use strict';

const hapi = require('@hapi/hapi');

// Servidor: Unidad basica y principal del framework, Creamos el servidor
const server = hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
});

const init = async () => {
  // Ruta: Define puntos de interaccion para la aplicacion
  server.route({
    // Definimos el method: Es el metodo HTTP por el cual un Browser o un cliente
    // debe acceder a la ruta
    method: 'GET',
    // Definimos el path: Define parte de la url que sera accedida por el cliente
    path: '/',
    // Definimos el handler: Funcion que se ejecuta cuando se accede a la ruta
    // (QUE ES LO QUE SE HARA CUANDO SE ACCEDA A LA RUTA)
    handler: (req, h) => {
      return 'Hola Mundo!';
    },
  });
  try {
    await server.start();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  console.log(`Servidor corriendo en: ${server.info.uri}`);
};

init();
