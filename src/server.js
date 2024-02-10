require('dotenv').config();
const Fastify = require('fastify')
const addRoutes = require('./router.js');
const errorHandler = require('./utils/errorHandler.js');

/*
Inicio de la aplicación.
Inicializa el servidor de Fastify y lo encinde.
*/
async function start() {
  try {
    const fastify = Fastify({
      logger: true
    })
    

    fastify.setErrorHandler(errorHandler)
    addRoutes(fastify)

    await fastify.listen({
      port: process.env.PORT,
      host: process.env.HOST
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start()