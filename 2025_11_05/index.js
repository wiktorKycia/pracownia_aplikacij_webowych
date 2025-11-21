const express = require('express')
const path = require('path')
const mysql = require('mysql2')

const mysql_host = 'database'
const mysql_user = 'root'
const mysql_password = 'admin123'
const mysql_database_name = 'database'

const port = 3000;
const host = 'localhost'

const app = express();

const pool = mysql.createPool({
    host: mysql_host,
    user: mysql_user,
    password: mysql_password,
    database: mysql_database_name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(express.urlencoded({ extended:false }))
app.use((req, res, next) => {
    console.log(`START ${new Date().toLocaleString()} [${req.method}] ${req.url}`)
    res.on('finish', function(){
        console.log(`END ${new Date().toLocaleString()} [${req.method}] ${req.url} ${res.statusCode}`)
    })
    next()
})

(async () => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS messages (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR(50), message TEXT)')
        console.log('Tabela messages gotowa')
    } catch (err) {
        console.error('Błąd tworzenia tabeli:', err)
    }
})()


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

app.post('/kontakt', async (req, res) => {
    const firstName = req.body?.first_name ?? '';
    const lastName = req.body?.last_name ?? '';
    const email = req.body?.email ?? ''
    const message = req.body?.message ?? ''

    console.log(`From: ${firstName} ${lastName}`)
    console.log(`Email: ${email}`)
    console.log(`Message content: \n ${message}`)

    try {
        const [result] = await pool.execute(
            'INSERT INTO messages (firstname, lastname, email, message) VALUES (?, ?, ?, ?)',
            [firstName, lastName, email, message]
        )
        console.log('Inserted ID: ' + result.insertId)
        res.redirect(302, '/')
    } catch (err) {
        console.error('Insert error:', err)
        res.sendStatus(500)
    }
})

app.get('/api/contact-messages', async (req, res) => {
    try {
        const [result] = await pool.execute(
            'SELECT * FROM messages'
        )
        res.json(result)
    } catch (err) {
        console.error('error:', err)
        res.sendStatus(500)
    }
})

app.get('/api/contact-messages/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    if(Number.isNaN(id))
    {
        return res.sendStatus(400)
    }

    try {
        const [rows] = await pool.execute(
            'SELECT * FROM messages WHERE id = ?',
            [id]
        )
        if(rows.length === 0)
        {
            res.sendStatus(404)
        }
        res.json(rows[0])
    } catch (err) {
        console.error('error:', err)
        res.sendStatus(500)
    }
})

app.listen(port, ()=>{
    console.log(`server running on: http://${host}:${port}`)
})





