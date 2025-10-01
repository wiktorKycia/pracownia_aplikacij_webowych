
const port = 8080;
const host = 'localhost';

const http = require('http');
const url = require('url');
const fs = require('fs');



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
                    return;
                }
                else
                {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
                }
            });
            break;
        }
    }
})

server.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`);
})