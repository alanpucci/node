const desc = {
    descripcion: {
        demand: true,
        alias: 'd'
    }
}

const { argv } = require('yargs')
    .command('crear', 'Crea una tarea por hacer', desc)
    .command('actualizar', 'Actualiza el estado completado de una tarea', desc)
    .command('borrar', 'Borra una tarea por hacer', desc)
    .help();



module.exports = {
    argv
}