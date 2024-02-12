const logTypes = {
  REQUEST: 'REQUEST',
  REPLY: 'REPLY',
  ERROR: 'ERROR'
}

function setLogRequestHook(fastify) {
  fastify.decorate('logRequest', async (request) => {
    const log = generalLog(request, logTypes.REQUEST)
    console.info(log)
  })
}

function setLogReplyHook(fastify) {
  fastify.decorate('logReply', (request, reply, payload, done) => {
    const log = generalLog(request, logTypes.REPLY)
    console.info({
      ...log,
      duration: reply.elapsedTime,
      statusCode: reply.statusCode,
      replyBody: JSON.parse(payload)
    })
    done()
  })
}

function logError(error, request) {
  console.error({
    type: logTypes.ERROR,
    time: new Date(),
    reqId: request.id,
    code: error.code,
    message: error.message
  })
}

function generalLog(request, type) {
  return {
    type,
    time: new Date(),
    reqId: request.id,
    method: request.method,
    endpoint: request.url,
    params: request.params,
    query: request.query,
    body: request.body
  }
}

module.exports = {
  setLogRequestHook,
  setLogReplyHook,
  logError
}