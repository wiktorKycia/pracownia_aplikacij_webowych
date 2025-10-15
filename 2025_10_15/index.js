
const port = 8080;
const host = 'localhost';

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path')

const mime = require('mime-types')



const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    console.log(req.url);
    const pathName = parsedUrl.pathname;
    const query = parsedUrl.query;

    switch (pathName)
    {
        case '/':
        {
            res.writeHead(200, {'Content-Type': 'text/plain'})
            res.write('Hello World!');
            res.end();
            break;
        }
        case '/json':
        {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({
                pathName,
                query,
                fullUrl: req.url
            }));
            break;
        }
        case '/generated-html':
        {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write('<h1>Hello World!</h1>');
            res.end();
            break;
        }
        case '/html-file':
        {
            fs.readFile('index.html', 'utf8', (err, data) => {
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
            break;
        }
        case '/get_params':
        {
            console.log(query);
            let arr = new Array(query);
            console.log(arr);

            fs.writeFile(`params_${Date.now()}.json`, JSON.stringify(arr), {flag: 'w'}, (err) => {
                if (err)
                {
                    console.error('Error writing to file:', err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                }
            })

            res.status = 200;
            res.end(JSON.stringify({'ok': 'ok'}));
            break;
        }
        default:
        {
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
        }
    }
})

server.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`);
})