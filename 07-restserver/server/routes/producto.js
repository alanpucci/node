const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();
const Producto = require('../models/producto');

//Obtener productos
app.get('/producto', verificaToken, (req, res) => {
    //trae todos los productos
    let desde = req.query.desde || 0;
    desde = Number(desde);
    Producto.find({ disponible: true })
        .skip(desde)
        //populate: usuario y categoria 
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productosDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `ID no existente`
                    }
                })
            }
            res.json({
                ok: true,
                productosDB
            })
        })
})

//Obtener un producto por id
app.get('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                productoDB
            })
        })

})

//Buscar productos por algun termino
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino;
    //Crear expresion regular basada en el termino
    //Ahora el termino va a ser insensible a mayusculas y minusculas
    //Tambien va a encontrar productos por mas que no este el nombre exacto
    let regex = new RegExp(termino, 'i');
    //Vamos a buscar los productos que coincidan con el termino modificado
    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                productos
            })
        })
})

//Crear un producto
app.post('/producto', verificaToken, (req, res) => {
    //Grabar el usuario, la categoria
    let body = req.body;
    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: true,
        categoria: body.categoria
    })
    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            productoDB
        })
    })

})

//Modificar un producto
app.put('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Producto.findByIdAndUpdate(id, body, { new: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            productoDB
        })
    })
})

//Borrar un producto
app.delete('/producto/:id', verificaToken, (req, res) => {
    //Cambiar el campo de "disponible" a falso
    let id = req.params.id;
    let cambiarEstado = {
        disponible: false
    }
    Producto.findByIdAndUpdate(id, cambiarEstado, { new: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            productoDB
        })
    })
})

module.exports = app;