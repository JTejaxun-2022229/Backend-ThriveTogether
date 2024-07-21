'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
import noteRoutes from '../src/note/note.routes.js'

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.authPath = '/thriveTogether/v1/auth';
        this.userPath = '/thriveTogether/v1/user';
        this.notePath = '/thriveTogether/v1/note'

        this.middlewares()
        this.conectarDB()
        this.routes()
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(helmet())
        this.app.use(morgan('dev'))
    }

    routes() {

        this.app.use(this.authPath, authRoutes);
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.notePath, noteRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port)
        })
    }
}

export default Server