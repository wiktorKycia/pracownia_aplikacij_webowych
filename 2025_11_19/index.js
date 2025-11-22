const express = require('express')
require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

const host = process.env.APP_HOST
const port = process.env.APP_PORT

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use((req, res, next) => {
    let date = new Date()
    console.log(
        `START ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} \t [${req.method}] ${req.url}`
    )
    res.on('finish', function () {
        let date = new Date()
        console.log(
            `END ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} \t [${req.method}] ${req.url} -> ${req.statusCode}`
        )
    })
    next()
})

app.use((err, req, res, next) => {
    if (err) {
        console.error(err)
        res.end(500)
    } else {
        next()
    }
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

app.post('/posts', async (req, res) => {
    const post = req.body
    const _now = Date().now

    await prisma.post.create({
        data: {
            createdAt: _now,
            updatedAt: _now,
            title: post.title,
            content: post.content,
            published: post.published || false,
            category: post.category,
            categoryId: post.category.id
        },
        include: { comments: true }
    })
    console.log(req.body)
    res.status(201).json(post)
})

app.put('/posts', async (req, res) => {
    const posts = req.body

    const { count } = await prisma.post.deleteMany()
    console.log(`Removed rows: ${count}`)

    const created = await prisma.post.createMany({ data: posts })
    console.log(`Created rows: ${created}`)
    console.log(req.body)
    res.status(200).end()
})

app.patch('/posts/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const post = req.body

    const updated = await prisma.post.update({
        where: { id: id },
        data: post
    })

    console.log(`Updated row: ${updated}`)

    res.status(200).end()
})

app.delete('/posts/:id', async (req, res) => {
    const id = req.params.id

    const deleted = await prisma.post.delete({
        where: { id: id }
    })

    console.log(deleted)
    res.status(200)
})

app.all('*', async (req, res) => {
    res.status(404).end()
})

app.listen(port, () => {
    console.log(`App is running on http://${host}:${port}`)
})
