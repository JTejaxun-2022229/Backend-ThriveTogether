'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'
import chatRoutes from '../src/chat/chat.routes.js';
import messageRoutes from '../src/message/message.routes.js';
import postRoutes from '../src/Post/post.routes.js'
import appointmentRoutes from '../src/appointment/appointment.routes.js'
import userRoutes from '../src/user/user.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import forumRoute from '../src/forum/forum.router.js'
import noteRoutes from '../src/note/note.routes.js'

class Server{

    constructor(){

        this.app = express()
        this.port = process.env.PORT

        this.userPath = '/thrive/v1/user'
        this.authPath = '/thrive/v1/auth'
        this.chatPath = '/thrive/v1/chat';
        this.messagePath = '/thrive/v1/message'
        this.postPath = '/thrive/v1/post';
        this.forumPath = '/thrive/v1/forum'
        this.appointmentPath = '/thrive/v1/appointment';
        this.notePath = '/thrive/v1/note';
        
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

        this.app.use(this.userPath, userRoutes);
        this.app.use(this.authPath, authRoutes)
        this.app.use(this.chatPath, chatRoutes);
        this.app.use(this.messagePath, messageRoutes);
        this.app.use(this.appointmentPath, appointmentRoutes);
        this.app.use(this.forumPath,forumRoute);
        this.app.use(this.postPath, postRoutes);
        this.app.use(this.notePath, noteRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port)
        })
    }
}

export default Server