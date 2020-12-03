require('./config/config');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Importamos y usamos la ruta de usuario
app.use(require('./routes/usuario'));

//Hacemos la conexion a la db a traves de mongoose
//1 param: la base de datos
//2 param: recibimos error y respuesta
mongoose.connect('mongodb://localhost:27017/cafe', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;

    console.log(`Base de datos online`);
})

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});