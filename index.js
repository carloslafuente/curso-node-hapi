'use strict';

const hapi = require('@hapi/hapi');
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

const init = async () => {
  try {
    // Registrar los plugins que HAPI usara, 
    // en este caso inert para subir archivos estaticos
    await server.register(inert);
    server.route({
      method: 'GET',
      path: '/home',
      handler: (req, h) => {
        // Gracias a inert accedemos al metodo file
        return h.file('index.html');
      },
    });
    // Ruta para servir los archivos estaticos
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
