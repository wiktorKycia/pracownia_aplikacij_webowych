const {Router} = require('express')
const path = require('path')

const booksRouter = Router()
booksRouter.get('/', (req, res) => {
    // json z pliku books
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

booksRouter.get('/search?title=', (req, res)=> {
    // wyszukiwanie po tytule
})

module.exports = booksRouter