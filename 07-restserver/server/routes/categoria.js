const express = require('express');
const { models } = require('mongoose');
let { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');
let _ = require('underscore');
let app = express();
let Categoria = require('../models/categoria');
const usuario = require('../models/usuario');
const categoria = require('../models/categoria');


//Mostrar todas las categorias
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        //Ordenar por descripcion
        .sort('descripcion')
        //Me muestra los datos de alguna coleccion, mostramos nombre y email 
        .populate('usuario')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                categorias
            })
        })
})

//Mostrar una categoria por id
app.get('/categoria/:id', (req, res) => {
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: `Hubo un error al buscar la categoria`
                }
            })
        }
        if (!categoriaDB) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `Categoria no encontrada`
                    }
                })
            }
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

//Crear nueva categoria
app.post('/categoria', verificaToken, (req, res) => {
    //Regresa la nueva categoria
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

//Modificar una categoria
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);
    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (
        err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })

})

app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    //Solo un admin puede borrar
    const id = req.params.id;
    Categoria.findByIdAndRemove(id, { new: true },
        (err, categoriaDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            if (!categoriaDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `El id no existe`
                    }
                })
            }
            res.json({
                ok: true,
                message: `Categoria eliminada`
            })
        })
})

module.exports = app;