const express = require('express')
const path = require('path')
const mysql = require('mysql')

const mysql_host = 'database'
const mysql_user = 'root'
const mysql_password = 'admin123'
const mysql_database_name = 'database'

const app = express();

const connection = mysql.createConnection({
    host: mysql_host,
    user: mysql_user,
    password: mysql_password,
    database: mysql_database_name

})

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(express.urlencoded({extended:false}))

const port = 3000;


connection.connect((err) => {
    if (err) {
        console.error('Błąd połączenia: ' + err.stack)
    }
    else
    {
        console.log('Połączono z bazą danych jako ID: ' + connection.threadId)
    }
})

connection.query('CREATE TABLE IF NOT EXISTS messages (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, firstname VARCHAR(50), lastname VARCHAR(50), email VARCHAR(50), message TEXT)', (err, results, fields) => {
    if (err) { throw err }
    console.log('Wynik zapytania: ' + results)
})

connection.end((err)=> {
    if (err) {
        console.error('Błąd zamknięcia połączenia: ' + err.stack)
    }
    else
    {
        console.log('Połączenie z bazą danych zostało zamknięte.')
    }
})


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

    // tutaj trzeba zapisać message do bazy

    connection.connect((err) => {
        if (err) {
            console.error('Błąd połączenia: ' + err.stack)
            res.sendStatus(500)
        }
        console.log('Połączono z bazą danych jako ID: ' + connection.threadId)
    })

    connection.query(`INSERT INTO messages (firstname, lastname, email, message) VALUES (${firstName}, ${lastName}, ${email}, ${message})`, (err, result) => {
        if (err) throw err
        console.log('Affected rows: ' + result.affectedRows)
    })

    connection.end((err) => {
        if (err) {
            console.error('Błąd zamknięcia połączenia: ' + err.stack)
            res.sendStatus(500)
        }
        console.log('Połączenie z bazą danych zostało zamknięte.')
    })


    res.redirect(302, '/')
})

app.get('/api/contact-messages', (req, res) => {
    const conn = mysql.createConnection({
        host: mysql_host,
        user: mysql_user,
        password: mysql_password,
        database: mysql_database_name
    });

    conn.connect((err) => {
        if (err) {
            console.error('Błąd połączenia: ' + err.stack)
            return res.sendStatus(500)
        }

        conn.query('SELECT * FROM messages', (err, results) => {
            if (err) {
                console.error('Query error:', err)
                conn.end(() => {})
                return res.sendStatus(500)
            }

            res.json(results)
            conn.end((endErr) => {
                if (endErr) console.error('Błąd zamknięcia połączenia: ' + endErr.stack)
            })
        })
    })
})

app.get('/api/contact-messages/:id', (req, res) => {
    // dane z wiersza z tabeli messages lub 404
})

app.listen(port, ()=>{
    console.log(`server running on: http://localhost:${port}`)
})





