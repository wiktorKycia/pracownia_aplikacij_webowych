const express = require('express');
const path = require('path')
const fs = require('fs')
const url = require('url')
const mime = require('mime-types')
const app = express();
const port = 3000;

app.use(express.json())
// app.use(express.static('static'))

app.use('/assets', express.static(path.join(__dirname, 'static')))

app.get('/', (req, res)=>{
    res.send("Strona główna");
})

app.get('/json', (req,res)=>{
    res.json({
        hello: 'world'
    })
})

app.get('/html', (req, res)=>{
    res.send("<h1>Welcome!</h1>");
})

app.get('/static-html', (req,res)=>{
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

app.get('/get_params', (req, res)=>{
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    console.log(query);
    let arr = new Array(query);
    console.log(arr)

    fs.writeFile(`params_${Date.now()}.json`, JSON.stringify(arr), {flag: 'w'}, (err)=>{
        if (err)
        {
            console.error('Error writing to a file: ', err)
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    })

    res.status = 200;
    res.end(JSON.stringify({'ok': 'ok'}));
})

app.all('*', (req, res) => {

    const parsedUrl = url.parse(req.url, true)
    const pathName = parsedUrl.pathname;

    let fileName = path.join('./assets', pathName)
    let mimeType = mime.lookup(fileName)
    if(!mimeType)
    {
        res.writeHead(404, {'Content-Type':'application/json'})
        res.end(JSON.stringify({
            "message": `file "${fileName}" does not exist!`
        }))
    }
    else
    {
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
});

app.listen(port, ()=>{
    console.log('server running on: http://localhost:3000')
})