const express = require('express');
const fs = require('fs');
const path = require('path');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();

app.get('/imagen/:tipo/:img', verificaToken, (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;
    //Path de la imagen
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        let pathNoImg = path.resolve(__dirname, '../assets/no-image.jpg')
        res.sendFile(pathNoImg)
    }
});

module.exports = app;