const {Router} = require('express')
const path = require('path')

const booksRouter = Router()
booksRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "data", "books.json"))
})

booksRouter.get('/:id(\\d+)', (req, res) => {
    // jedna książka po id
})

booksRouter.post('/', (req, res)=>{
    // dodanie nowej 1 książki, zapis do pliku json
})

booksRouter.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "add.html"))
})

booksRouter.get('/search', (req, res)=> {
    const {title} = req.query
})

module.exports = booksRouter