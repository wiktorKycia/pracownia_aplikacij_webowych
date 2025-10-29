const express = require('express')
const path = require('path')
const fs = require('fs')
const url = require('url')
const mime = require('mime-types')


const app = express();
const port = 3000;

app.get('/', (req, res) => {
    fs.readFile('./static/index.html', 'utf8', (err, data) => {
        if (err)
        {
            console.error('Error reading file:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
        else
        {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
})