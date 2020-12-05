require('./config/config');

const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); //Para solucionar el tema de la direccion del public

// parse application/x-www-form-urlencoded
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

//Importamos y usamos la rutas
app.use(require('./routes/index'));

//Hacemos la conexion a la db a traves de mongoose
//1 param: la base de datos
//2 param: recibimos error y respuesta
mongoose.connect(process.env.URLDB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;

    console.log(`Base de datos online`);
})

mongoose.set('useFindAndModify', false);

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});