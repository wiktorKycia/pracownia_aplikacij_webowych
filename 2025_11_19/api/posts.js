const express = require('express')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const { PrismaClient, Prisma } = require('@prisma/client')

const myenv = dotenv.config({ path: '.env' })
dotenvExpand.expand(myenv)

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const posts = await prisma.post.findMany()
    console.log(posts)
    res.status(200).json(posts)
})

router.get('/:id', async (req, res) => {
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
    if (post) {
        res.status(200).json(post)
    } else {
        res.sendStatus(404)
    }
})

router.post('/', async (req, res, next) => {
    const post = req.body
    const _now = Date.now()

    console.log(req.body)

    try {
        const created = await prisma.post.create({
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

        if (created) {
            res.status(201).json(created)
        } else {
            res.json({ message: 'could not create the resource' }).end(500)
        }
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            err.message = 'Database error'
            err.status = 400
        }
        next(err)
    }
})

router.put('/', async (req, res) => {
    const posts = req.body

    const { count } = await prisma.post.deleteMany()
    console.log(`Removed rows: ${count}`)

    const created = await prisma.post.createMany({ data: posts })
    console.log(`Created rows: ${created}`)
    console.log(req.body)
    res.status(200).end()
})

router.patch('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const post = req.body

    const updated = await prisma.post.update({
        where: { id: id },
        data: post
    })

    console.log(`Updated row: ${updated}`)

    res.status(200).end()
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const deleted = await prisma.post.delete({
        where: { id: id }
    })

    console.log(deleted)
    res.status(200)
})

module.exports = router
