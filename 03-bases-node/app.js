const { crearArchivo } = require('./multiplicar/multiplicar');

let base = 'asasdas';

crearArchivo(base)
    .then(mensaje => console.log(`Archivo ${mensaje} creado exitosamente`))
    .catch(err => console.log(err));