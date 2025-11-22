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

    console.log(req.body)

    try {
        let created = await prisma.post.create({
            data: {
                title: post.title,
                content: post.content || null,
                published: post.published || false,
                categoryId: post.categoryId
            },
            include: { comments: true }
        })

        if (created) {
            res.status(201).json(created)
        } else {
            throw new Error('Prisma client could not create the resource')
        }
    } catch (err) {
        if (err instanceof Prisma.PrismaClientValidationError) {
            err.status = 400
        }
        next(err)
    }
})

router.put('/', async (req, res, next) => {
    const posts = req.body
    console.log(req.body)

    try {
        const { count } = await prisma.post.deleteMany()
        console.log(`Removed rows: ${count}`)

        const created = await prisma.post.createMany({ data: posts })

        if (created) {
            console.log(`Created rows: ${created}`)
            res.sendStatus(200)
        } else {
            throw new Error('Prisma client could not replace the resources')
        }
    } catch (err) {
        if (err instanceof Prisma.PrismaClientValidationError) {
            err.status = 400
        }
        next(err)
    }
})

router.patch('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)
    const post = req.body

    try {
        const updated = await prisma.post.update({
            where: { id: id },
            data: post
        })

        if (updated) {
            console.log(`Updated row: ${updated}`)
            res.sendStatus(200)
        } else {
            throw new Error('Prisma client could not update the resource')
        }
    } catch (err) {
        if (err instanceof Prisma.PrismaClientValidationError) {
            err.status = 400
        } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
            err.status = 404
        }
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id)

    try {
        const deleted = await prisma.post.delete({
            where: { id: id }
        })

        console.log(deleted)
        res.sendStatus(200)
    } catch (err) {
        if (err instanceof Prisma.PrismaClientValidationError) {
            err.status = 400
        } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
            err.status = 404
        }
        next(err)
    }
})

module.exports = router
