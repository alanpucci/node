const { argv } = require('./config/yargs');
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(`Tarea ${tarea.descripcion} creada correctamente`);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        console.log(`===== POR HACER =====`.green);
        for (let task of listado) {
            console.log(`Tarea: ${task.descripcion}`);
            console.log(`Completado: ${task.completado}`.yellow);
            console.log(`------------------`);
        }
        console.log(`=====================`.green);
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion);
        actualizado ? console.log(`Actualizado correctamente`) : console.log(`Hubo un error`);
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        borrado ? console.log(`Borrado correctamente`) : console.log(`Hubo un error`);
        break
    default:
        console.log(`Comando no reconocido`);
}