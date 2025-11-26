import express from 'express'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { PrismaClient } from '@prisma/client'
import { PrismaClientValidationError, PrismaClientKnownRequestError } from '@prisma/client/runtime'

const myenv = dotenv.config({ path: '.env' })
dotenvExpand.expand(myenv)

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const categories = await prisma.category.findMany()
    console.log(categories)
    res.status(200).json(categories)
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    if (Number.isNaN(id)) {
        return res.sendStatus(400)
    }

    const category = await prisma.category.findFirst({
        where: { id: id }
    })
    console.log(category)
    if (category) {
        res.status(200).json(category)
    } else {
        res.sendStatus(404)
    }
})

router.post('/', async (req, res, next) => {
    const category = req.body

    console.log(req.body)

    try {
        const created = await prisma.category.create({
            data: {
                name: category.name
            },
            include: { posts: true }
        })

        if (created) {
            res.status(201).json(created)
        } else {
            throw new Error('Prisma client could not create the resource')
        }
    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientValidationError) {
            err.status = 400
        }
        next(err)
    }
})

router.put('/', async (req, res, next) => {
    const categories = req.body
    console.log(req.body)

    try {
        const { count } = await prisma.category.deleteMany()
        console.log(`Removed rows: ${count}`)

        const created = await prisma.category.createMany({
            data: categories
        })

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
    const category = req.body
    console.log(req.body)

    try {
        const updated = await prisma.category.update({
            where: { id: id },
            data: category
        })

        if (updated) {
            console.log(updated)
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
        const deleted = await prisma.category.delete({
            where: { id: id }
        })

        if (deleted) {
            console.log(deleted)
            res.sendStatus(200)
        } else {
            throw new Error('Prisma client could not delete the resource')
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

module.exports = router
