const {Router} = require('express')
const path = require('path')
const fs = require('fs')

const booksRouter = Router()
booksRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "data", "books.json"))
})

booksRouter.get('/:id(\\d+)', (req, res) => {
    const id = req.params.id
    const books = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "books.json"), "utf-8"))

    const book = books.filter((book) => book.id == id)

    res.json(book)
})

booksRouter.post('/', (req, res)=>{
    const body = req.body
    if(!body)
    {
        res.sendStatus(400)
    }

    const books = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data","books.json"), "utf-8"))

    books.push({id:books.length+1, ...body})

    fs.writeFileSync(path.join(__dirname, "..", "data","books.json"), JSON.stringify(books))

    res.sendStatus(201)
})

booksRouter.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "add.html"))
})

booksRouter.get('/search', (req, res)=> {
    const {title} = req.query
    const books = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "books.json"), 'utf-8'))
    const book = books.filter((book) => book.title === title)    
    if (book.length > 0)
    {
        res.json(book)
    }
    else
    {
        res.sendStatus(404)
    }
})

module.exports = booksRouter