import express from 'express'
import * as postsRouter from './api/posts'
import * as categoriesRouter from './api/categories'
import * as commentsRouter from './api/comments'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const myenv = dotenv.config({ path: '.env' })
dotenvExpand.expand(myenv)

const host = process.env.APP_HOST
const port = process.env.APP_PORT

const app = express()

function add0(a) {
    if (a < 10) {
        return `0${a}`
    } else {
        return a
    }
}

app.use(express.json())
app.use((req, res, next) => {
    console.log('======================================')
    const date = new Date()
    console.log(
        `START ${add0(date.getDate())}.${add0(date.getMonth())}.${date.getFullYear()} ${add0(date.getHours())}:${add0(date.getMinutes())}:${add0(date.getSeconds())} \t [${req.method}] ${req.originalUrl}`
    )
    res.on('finish', () => {
        const date = new Date()
        console.log(
            `END   ${add0(date.getDate())}.${add0(date.getMonth())}.${date.getFullYear()} ${add0(date.getHours())}:${add0(date.getMinutes())}:${add0(date.getSeconds())} \t [${req.method}] ${req.originalUrl} -> ${res.statusCode}`
        )
    })
    next()
})

app.use('/api/v1/posts', postsRouter)
app.use('/api/v1/categories', categoriesRouter)
app.use('/api/v1/comments', commentsRouter)

app.use(async (err, req, res, next) => {
    if (err) {
        console.error(err)
        res.sendStatus(err.status || 500)
    } else {
        next()
    }
})

app.get('/', (req, res) => {
    res.status(200).json({ content: 'to jest strona główna' })
})

app.all('*', async (req, res) => {
    res.sendStatus(404)
})

app.listen(port, () => {
    console.log(`App is running on http://${host}:${port}`)
})
