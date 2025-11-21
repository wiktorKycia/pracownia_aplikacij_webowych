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
            comments: [],
            category: post.category,
            categoryId: post.category.id
        }
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

app.delete('/posts/:id', async (req, res) => {})

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})
