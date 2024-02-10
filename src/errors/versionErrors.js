class VersionNotFoundError extends Error {
    constructor() {
        super('Version not found')
        this.code = 'VERSION_NOT_FOUND_ERROR'
        this.statusCode = 500
    }
}

module.exports = VersionNotFoundError
