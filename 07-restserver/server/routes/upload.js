const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
const path = require('path');

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

//Carga los archivos en 'req.files'
app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:tipo/:id', (req, res) => {
    //Obtenemos el tipo por parametro
    let tipo = req.params.tipo;
    //Obtenemos el id por parametro
    let id = req.params.id;

    //En caso de que no se haya seleccionado ningun archivo
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: `No se ha seleccionado ningun archivo`
        })
    }
    //Verificamos los tipos permitidos para subir imagen
    let tiposValidos = ['productos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: `No es un tipo valido`
            }
        })
    }

    //Archivo es el nombre que le damos al body en postman
    let archivo = req.files.archivo;

    //Separo el nombre del archivo de la extension
    let nombreArchivoCortado = archivo.name.split('.');
    //Obtengo la extension
    let extension = nombreArchivoCortado[nombreArchivoCortado.length - 1];

    //Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    //Verificar si la extension es valida
    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: `Extension no permitida`
            }
        })
    }

    //Cambiar nombre al archivo
    //ID - milisegundos . extension
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`

    //Muevo el archivo dentro de la carpeta uploads bajo el nombre de "filename.png"
    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (tipo === 'usuarios') {
            imagenUsuario(id, res, nombreArchivo);
        } else {
            imagenProducto(id, res, nombreArchivo);
        }
    })
});

const imagenUsuario = (id, res, nombreArchivo) => {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            //Eliminamos el archivo que me acaba de crear
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(500).json({
                ok: false,
                err: {
                    message: `Hubo un error`
                }
            })
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `No existe un usuario con ese ID`
                }
            })
        }
        //Llamamos la funcion que borra un archivo
        borraArchivo(usuarioDB.img, 'usuarios');
        //Guardamos la nueva imagen del usuario
        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            })
        })
    })
}

const imagenProducto = (id, res, nombreArchivo) => {
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            //Eliminamos el archivo que me acaba de crear
            borraArchivo(nombreArchivo, 'productos');
            return res.status(500).json({
                ok: false,
                err: {
                    message: `Hubo un error`
                }
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `No existe un producto con ese ID`
                }
            })
        }
        //Llamamos la funcion que borra un archivo
        borraArchivo(productoDB.img, 'productos');
        //Guardamos la nueva imagen del producto
        productoDB.img = nombreArchivo;
        productoDB.save((err, productoGuardado) => {
            res.json({
                ok: true,
                producto: productoGuardado,
                img: nombreArchivo
            })
        })
    })
}

const borraArchivo = (nombreImagen, tipo) => {
    //Nos guardamos el url de la imagen del usuario
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
    //Verificamos si existe ya una imagen del usuario
    if (fs.existsSync(pathImagen)) {
        //En caso de que exista, la eliminamos para luego reemplazarla por una nueva
        fs.unlinkSync(pathImagen);
    }
}

module.exports = app;