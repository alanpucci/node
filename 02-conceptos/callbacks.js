let getUsuarioById = (id, callback) => {
    let usuario = {
        nombre: 'Alan',
        id
    }

    if (id === 20) {
        callback(`El usuario con id ${id} no existe en la BD`);
    } else {
        callback(null, usuario);
    }
}

getUsuarioById(2, (err, usuario) => {
    if (err) {
        return console.log(err);
    } else {
        console.log('Usuario de base de datos', usuario);
    }
})