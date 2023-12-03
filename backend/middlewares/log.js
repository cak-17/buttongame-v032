const { logger } = require('../utils/logger')

const logMiddleware = (req, res, next) => {
    logger.apiCall(req.method, res.statusCode, decodeURI(req.url), req.headers['user-agent'])
    next()
}

module.exports = logMiddleware;