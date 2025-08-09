const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
    if(req.method === 'GET' && req.url === '/'){
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.end('This is GET request');
    }
    else if(req.method === 'POST' && req.url === '/data'){
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            res.writeHead(200, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({message: 'POST request recived', data: body}));
        });
    }
    else{
        res.writeHead(404, {'Content-Type' : 'text/plain'});
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server is running at port ${port}`)
});