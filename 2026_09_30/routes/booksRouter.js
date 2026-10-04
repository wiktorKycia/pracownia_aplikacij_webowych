const {Router} = require('express')


const booksRouter = Router()
booksRouter.get('/', (req, res) => { // books \>
    // json z pliku books
    res.send("książki")
})

booksRouter.get('/:id', (req, res) => {
    // jedna książka po id
})

booksRouter.post('/', (req, res)=>{
    // dodanie nowej 1 książki, zapis do pliku json
})

booksRouter.get('/add', (req, res) => {
    // formularz dodawania książki
})

booksRouter.get('/search?title=', (req, res)=> {
    // wyszukiwanie po tytule
})


module.exports = booksRouter