class ServerError extends Error {
    constructor(message) {
        super(message)
        this.code = 'SERVER_ERROR'
    }
}

module.exports = ServerError
