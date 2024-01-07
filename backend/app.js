const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const http = require('http');
const { Server } = require('socket.io')
const db = require('./db');

const logMiddleware = require('./middlewares/log')

const router = require('./routers')
const userRouter = require('./routers/userRouter');

const userEvents = require('./events/user')
const chatEvents = require('./events/chat')
const fileEvents = require('./events/files')
const { promptListen } = require('./utils/prompts');
const { DEFAULTS } = require('./settings/index');

const { logger } = require('./utils/logger')

class App {
    app = express()
    retryAttempts = DEFAULTS.RETRY

    #host
    #port

    playersQueue = []

    constructor(host, port) {
        this.#host = host || DEFAULTS.HOST
        this.#port = port || DEFAULTS.PORT

        // Set up
        this.app.use(fileUpload())
        this.app.use(express.json())
        this.app.use(cors());
        this.app.use(logMiddleware);

        // this.app.use(errorMiddleware);
        // this.app.use(notFoundMiddleware);

        this.app.locals.title = DEFAULTS.APP_NAME

        // Define routers
        this.app.use('/', router)
        this.app.use('/api/auth', userRouter)

        // Create HTTP server
        this.server = http.createServer(this.app)
        this.io = new Server(this.server, {
            cors: DEFAULTS.CORS
        })
    }

    setPort(port) {
        this.#port = port
    }

    setHost(host) {
        this.#host = host
    }

    setDevEnv() {
        this.#host = DEFAULTS.DEV_HOST
        this.#port = DEFAULTS.PORT
    }

    getInfo() {
        return (this.#host, this.#port)
    }
    runServer(input) {
        this.server.listen(this.#port, this.#host, () => {
            if (!input) promptListen(this.server)
        }).on('error', (e) => {
            const errorCode = e.code
            if (errorCode === 'EADDRINUSE') {
                if (this.retryAttempts > 0) {
                    console.error(`--- Address ${this.#host}:${this.#port} already in use, retry ${this.retryAttempts}/5...\n`);
                    setTimeout(() => {
                        this.server.close();
                        this.server.listen(this.#port, this.#host);
                        this.retryAttempts--;
                    }, 2000);
                }
                // format to label
                else {
                    logger.error(`Address ${e.address}:${e.port} is already in use`)
                    logger.info('Trying new port...')
                    this.setPort(e.port + 1);
                    this.retryAttempts = 5;
                    this.server.listen(this.#port, this.#host);
                }
            }
        }).on('close', () => {
            db.close()
        });

        this.io.on('connection', async (socket) => {

            if(socket.data) {
                logger.info('connection - socket.id -> ', socket.id)
            }

            socket.data.user = {
                username: (socket.id).slice(1, 6)
            }

            userEvents(this.io, socket)
            fileEvents(this.io, socket)
            chatEvents(this.io, socket)

            socket.on('disconnect', async () => {
                const data = `${socket.data.user.username} has disconnected.`;
                logger.info(data)
            });
        })


    }

    close() {
        this.server.close()
        this.io.close()
    }
}


module.exports = new App();

