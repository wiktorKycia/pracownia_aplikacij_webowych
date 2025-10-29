const express = require('express')
const path = require('path')
const fs = require('fs')
const url = require('url')
const mime = require('mime-types')


const app = express();

app.use('/static', express.static(path.join(__dirname, 'static')))

const port = 3000;

function readStatic(file, res)
{
    let fileName = file //path.join('./static', file)
    let mimeType = mime.lookup(fileName)
    if(!mimeType)
    {
        res.writeHead(404, {'Content-Type':'application/json'})
        res.end(JSON.stringify({
            "message": `file "${fileName}" does not exist!`
        }))
        return;
    }
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err)
        {
            console.error('Error reading file:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
        else
        {
            res.writeHead(200, {'Content-Type': mimeType});
            res.end(data);
        }
    });
}

app.get('/', (req, res) => {
    readStatic('/static/index.html', res)
})

app.get('/o-nas', (req, res) => {
    readStatic('/static/index.html', res)
})

app.get('/oferta', (req, res) => {
    readStatic('/static/index.html', res)
})

app.get('/kontakt', (req, res) => {
    readStatic('/static/index.html', res)
})

app.listen(port, ()=>{
    console.log(`server running on: http://localhost:${port}`)
})





