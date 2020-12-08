const express = require('express');
//Importamos el socket.io
const socketIO = require('socket.io');
//Socket trabaja con http
const http = require('http');

const path = require('path');

const app = express();
//Creamos un servidor con toda la configuracion para el express
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//Inicializamos el socket io y lo exportamos para usarlo en server/socket
module.exports.io = socketIO(server); //Comunicacion directa con el backend
require('./sockets/socket');

server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});