import express, { Express } from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })
// import { PrismaClient } from '@prisma/client'

const host = process.env.APP_HOST
const port = process.env.APP_PORT

const app: Express = express()

app.listen(port, () => {
    console.log(`App is running on http://${host}:${port}`)
})
