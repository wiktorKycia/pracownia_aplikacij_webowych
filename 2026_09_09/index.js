const http = require('http')
const { writeFile, readFile } = require('fs/promises')
const url = require('url')

const hostname = '127.0.0.1'
const port = 3000
const server = http.createServer(async (req, res) => {
    const query = url.parse(req.url, true) 

    switch (query.pathname){
        case '/': {
            const html = await readFile('./index.html')
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.write(html)
            res.end()
            break;
        }
        case '/css/style.css': {
            const css = await readFile('./css/style.css')
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/css')
            res.end(css)
            break;
        }
        case '/kontakt': {
            const body = query.query
            await writeFile(`message_${Date.now().toString()}.json`, JSON.stringify(body))

            const html = await readFile('./contact.html')
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(html)
            break;
        }
        default: {
            res.statusCode = 404
            res.end('Not found')
        }
    }
})
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})