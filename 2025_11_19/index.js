const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({ content: 'to jest strona główna' })
})

app.get('/posts', async (req, res) => {
    const posts = prisma.post.findMany()
    console.log(posts)
    res.status(200).json(posts)
})

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})
