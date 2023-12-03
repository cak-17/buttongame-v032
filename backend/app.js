const express = require("express");
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io')
const db = require('./db');

const logMiddleware =  require('./middlewares/log')
const { errorMiddleware, notFoundMiddleware } = require("./middlewares/errors");

const router = require('./routers')
const userRouter = require('./routers/userRouter');

const userEvents = require('./events/user')
const chatEvents = require('./events/chat')
const gameEvents = require('./events/game')

const { promptListen, formatCli } = require('./utils/prompts');
const { DEFAULTS } = require('./settings/index');
const ChatMsg = require("./models/ChatMsg")
const { logger } = require('./utils/logger')

class App {
    app = express()
    retryAttempts = DEFAULTS.RETRY

    #host
    #port

    playersQueue = []

    constructor(host, port){
        this.#host = host || DEFAULTS.HOST
        this.#port = port || DEFAULTS.PORT

        // Set up
        this.app.use(express.json());
                  
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
                    console.error(`--- Address already in use, retry ${this.retryAttempts}/5...\n`);
                    setTimeout(() => {
                        this.server.close();
                        this.server.listen(this.#port, this.#host);
                        this.retryAttempts--;
                    }, 1000);
                }
                // format to label
                else console.warn(`\x1b[1;31m[ERROR]\x1b[0m Address ${e.address}:${e.port} is already in use`)
            }
        }).on('close', () => {
            db.close()
        });

        this.io.on('connection', async (socket) => {

            socket.data.username = (socket.id).slice(1, 6);
            const user = socket.data.username


            socket.on('disconnect', () => {
                logger.info(`${user} disconnected!`);
                this.io.emit('chat message', { 
                    msg:`${user} left the party`, 
                    username: user, 
                    isSystemMessage:true, 
                    timestamp: null
                });
            });
            userEvents(this.io, socket)
            chatEvents(this.io, socket)
            gameEvents(this.io, socket)
        })
    }

    close() {
        this.server.close()
        this.io.close()
    }
}


module.exports = new App();

