const { io } = require('../server')

//Hacemos la conexion activa activa, es decir desde el html y desde aca
//podemos recibir toda la informacion de quien conecta
io.on('connection', (client) => {
    console.log(`Usuario conectado`);
    client.emit('enviarMensaje', {
            usuario: 'Administrador',
            mensaje: 'Bienvenido a esta aplicacion'
        })
        //Cuando se desconecta el usuario
    client.on('disconnect', () => {
            console.log(`Usuario desconectado`);
        })
        //Escuchar al cliente, recibimos el mensaje y un callback
    client.on('enviarMensaje', (data, callback) => {
        console.log(data);

        //Broadcast para que le llegue a todos los usuarios cuando se envia un msj
        client.broadcast.emit('enviarMensaje', data);

        // if (mensaje.usuario) {
        //     callback({ //Callback que se dispara cuando esta todo OK
        //         mensaje: `Todo esta ok`
        //     });
        // } else { //Callback cuando algo salio mal
        //     callback({
        //         mensaje: `Algo salio mal`
        //     })
        // }
    })
})