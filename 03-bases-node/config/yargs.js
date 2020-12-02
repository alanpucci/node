const opts = {
    base: {
        demand: true,
        alias: 'b'
    },
    limite: {
        alias: 'l',
        default: 10
    }
}

//Con yargs podemos obtener valores de consola de una mejor forma
//Con el .command le pasamos 3 parametros, el primero la "funcion" a ejecutar
//2) una descripcion de esa funcion
//3) un objeto con las propiedades que puede recibir, ademas dentro de cada
//propiedad podemos determinar si es obligatorio o no
const argv = require('yargs')
    .command('listar', 'Imprime la tabla de multiplicar', opts)
    .command('crear', 'Crea un archivo con la tabla de multiplicar', opts)
    //Agregamos la opcion de help para acceder por consola
    .help()
    .argv;

module.exports = {
    argv
}