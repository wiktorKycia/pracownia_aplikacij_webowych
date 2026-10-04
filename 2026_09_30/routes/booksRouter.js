const {Router} = require('express')


const booksRouter = Router()
booksRouter.get('/books', (req, res) => { // books \>
    // json z pliku books
})

booksRouter.get('/books/:id', (req, res) => {
    // jedna książka po id
})

booksRouter.post('/books', (req, res)=>{
    // dodanie nowej 1 książki, zapis do pliku json
})

booksRouter.get('/add', (req, res) => {
    // formularz dodawania książki
})

booksRouter.get('/books/search?title=', (req, res)=> {
    // wyszukiwanie po tytule
})


module.exports = booksRouter