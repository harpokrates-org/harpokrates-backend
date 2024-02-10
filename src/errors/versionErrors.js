class VersionNotFoundError extends Error {
    constructor() {
        super('Version not found')
        this.code = 'VERSION_NOT_FOUND_ERROR'
    }
}

module.exports = VersionNotFoundError
