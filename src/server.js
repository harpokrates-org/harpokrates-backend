require('dotenv').config();
console.log(`API KEY: ${process.env.FLICKR_API_KEY}`)
const FastifyWrapper = require('./fastify.js');

/*
Inicio de la aplicación.
Inicializa el servidor de Fastify y lo encinde.
*/
async function start() {
  try {
    const app = new FastifyWrapper()

    app.start(
      process.env.PORT,
      process.env.HOST
    )
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start()
