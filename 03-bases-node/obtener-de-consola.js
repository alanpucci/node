const { crearArchivo, listarArchivo } = require('./multiplicar/multiplicar');
const { argv } = require('./config/yargs');
const colors = require('colors');

// let argv2 = process.argv;
// let parametro = argv[2];
// let base = parametro.split('=')[1];
// console.log(base);

let comando = argv._[0];

switch (comando) {
    case 'listar':
        listarArchivo(argv.base, argv.limite)
            .then(mensaje => console.log(`Fin de la impresion tabla de ${mensaje}`.cyan))
            .catch(err => console.log(err))
        break;
    case 'crear':
        crearArchivo(argv.base, argv.limite)
            .then(mensaje => console.log(`Archivo ${mensaje} creado exitosamente`.green))
            .catch(err => console.log(err));
        break;
    default:
        console.log(`Comando no reconocido`);
}