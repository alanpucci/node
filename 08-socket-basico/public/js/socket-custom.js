var socket = io();
//Los emit son para enviar informacion
//Los on son para escuchar informacion
//Conectamos al servidor
socket.on('connect', function() {
        console.log('Conectado al servidor');
    })
    //Cuando se desconecta el servidor
socket.on('disconnect', function() {
        console.log('Perdimos conexion con el servidor');
    })
    //Enviamos un mensaje por parte del cliente al servidor
socket.emit('enviarMensaje', {
        usuario: 'Alan',
        mensaje: 'Hola mundo'
    }, (resp) => { //Callback que se ejecuta en caso de que todo este OK
        console.log('Respuesta server: ', resp)
    })
    //Escuchar informacion
socket.on('enviarMensaje', (mensaje) => {
    console.log(mensaje);
})