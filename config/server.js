'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'
import chatRoutes from '../src/chat/chat.routes.js';
import messageRoutes from '../src/message/message.routes.js';

class Server{
    
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.chatPath = '/thrive/v1/chat';
        this.messagePath = '/thrive/v1/message';

        this.middlewares()
        this.conectarDB()
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(helmet())
        this.app.use(morgan('dev'))
    }

    routes(){
        this.app.use(this.chatPath, chatRoutes)
        this.app.use(this.messagePath, messageRoutes)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port)
        })
    }
}

export default Server