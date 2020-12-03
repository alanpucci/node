const express = require('express');
const app = express();

const mongoose = require('mongoose');

app.get('/usuario', function(req, res) {
    res.json('get usuario');
})

mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw new Error(err);

    console.log(`Base de datos online`);
})

app.listen(3000);
console.log('Escuchando puerto ', 3000);