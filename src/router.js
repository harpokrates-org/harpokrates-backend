const versionRoute = require('./version/route.js')

module.exports = async function(fastify) {
    fastify.register(versionRoute)
}
