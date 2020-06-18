'use strict';

const hapi = require('@hapi/hapi');

const server = hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
});

const init = async () => {
  server.route({
    method: 'GET',

    path: '/',

    handler: (req, h) => {
      return h.response('Hola Mundo!').code(200);
    },
  });
  server.route({
    method: 'GET',
    path: '/redirect',
    handler: (req, h) => {
      return h.redirect('https://platzi.com');
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

// Servidor: Unidad basica y principal del framework, Creamos el servidor
// Ruta: Define puntos de interaccion para la aplicacion
// Definimos el method: Es el metodo HTTP por el cual un Browser o un cliente
// debe acceder a la ruta
// Definimos el path: Define parte de la url que sera accedida por el cliente
// Definimos el handler: Funcion que se ejecuta cuando se accede a la ruta
// (QUE ES LO QUE SE HARA CUANDO SE ACCEDA A LA RUTA)
// h es una coleccion de utilidades y propiedades relativas a enviar
// informacion de respuesta
// h.response: Crea un objeto de respuesta
// h.redirect: Redirecciona una peticion
