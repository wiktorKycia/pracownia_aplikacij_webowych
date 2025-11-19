const express = require('express')
require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use((req, res, next) => {
    console.log(`START ${new Date().toLocaleString()} [${req.method}] ${req.url}`)
    res.on('finish', function () {
        console.log(`END ${new Date().toLocaleString()} [${req.method}] ${req.url} ${res.statusCode}`)
    })
    next()
})

app.get('/', (req, res) => {
    res.status(200).json({ content: 'to jest strona główna' })
})

app.get('/posts', async (req, res) => {
    const posts = await prisma.post.findMany()
    console.log(posts)
    res.status(200).json(posts)
})

app.get('/posts/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    if (Number.isNaN(id)) {
        return res.sendStatus(400)
    }
    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    })
    console.log(post)
    if (post == null) {
        res.status(404).end()
    } else {
        res.status(200).json(post)
    }
})

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})
