const mongoose = require('mongoose');
const { DATABASE } = require('../settings/index')
const { logger } = require('../utils/logger')
const { formatCli } = require('../utils/prompts')

const dbCredentials = `${DATABASE.DB_USER}:${DATABASE.DB_PASS}@${DATABASE.DB_HOST}`
logger.debug(dbCredentials)
const uri = `mongodb+srv://${dbCredentials}/?retryWrites=true&w=majority`

mongoose
    .connect(uri, {
        useNewUrlParser: true,
    })
    .then(() => {
        formatCli(` \x1b[1;37m[DB]\x1b[0m ${DATABASE.DB_USER} connected on ${DATABASE.DB_HOST}`)
    })
    .catch(err => {
        logger.error(`Connection Error: ${err.message}`)
    })

const db = mongoose.connection

db.on('close', () => {
    formatCli(` \x1b[1;37m[DB]\x1b[0m Connection with ${DATABASE.DB_HOST} was terminated`)
})

module.exports = db;

