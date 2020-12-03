const lugar = require('./lugar/lugar');

//Con options podemos directamente darle comandos a yargs
const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener el clima',
        demand: true
    }
}).argv;
lugar.getLugarLatLng(argv.direccion)
    .then(console.log)
    .catch(err => console.log(`Errorrrr ${err}`))