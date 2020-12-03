const http = require('http');

http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'applicattion/json' });
        let salida = {
            nombre: 'Alan',
            edad: 26,
            url: req.url
        }
        res.write(JSON.stringify(salida));
        res.end();
    })
    .listen(8080);

console.log(`Escuchando....`);