const express = require('express')
const path = require('path')

const app = express();

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(express.urlencoded({extended:false}))

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'))
})

app.get('/o-nas', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'o-nas.html'));
})

app.get('/oferta', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'oferta.html'));
})

app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'kontakt.html'));
})

app.post('/kontakt', (req, res) => {
    const firstName = req.body?.first_name ?? '';
    const lastName = req.body?.last_name ?? '';
    const email = req.body?.email ?? ''
    const message = req.body?.message ?? ''

    console.log(`From: ${firstName} ${lastName}`)
    console.log(`Email: ${email}`)
    console.log(`Message content: \n ${message}`)

    res.redirect(302, '/')
})

app.listen(port, ()=>{
    console.log(`server running on: http://localhost:${port}`)
})





