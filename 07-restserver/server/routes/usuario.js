const express = require('express');
const app = express();

//importamos el encriptador de contrasenas
const bcrypt = require('bcrypt');

//importamos underscore
const _ = require('underscore');

//Va en mayuscula porque estamos creando un objeto de Usuario
const Usuario = require('../models/usuario');

app.get('/usuario', function(req, res) {

    //podemos recibir como parametro en la url, desde donde queremos skipear (por ejemplo)
    // let desde = req.query.desde || 0;
    // desde = Number(desde); //convertimos en un Int

    // let limite = req.query.limite || 5;
    // limite = Number(limite);

    //busca todos los usuarios, dentro del objeto del parametro podemos determinar alguna condicion
    //por ejemplo buscar todos los usuarios activos
    //2 param: OPCIONAL podemos determinar que campos mostrar unicamente del usuario
    Usuario.find({})
        //podemos skipear los primeros registros
        //.skip(desde)
        //ponemos como limite que solo me devuelva x registros
        //.limit(limite)
        //ejecutamos el find, como parametro recibimos el error o un arreglo de usuarios
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            //me devuelve todos los registros de usuarios y la cantidad
            Usuario.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    conteo,
                    usuarios
                });
            })
        })

});

app.get('/usuario/:id', function(req, res) {
    let id = req.params.id;
    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario
        });
    })

});


app.post('/usuario', function(req, res) {
    let body = req.body;
    //Estamos creando una instancia del esquema de mongoose creado en ../models/usuario
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        //encripta el pass directamente(sin callbacks)
        //como segundo parametro la cantidad de vueltas que le da
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    //Vamos a guardar el usuario recien creado dentro de la db
    //Puedo recibir un error o un usuario guardado correctamente
    usuario.save((err, usuarioDB) => {
        //En caso de que haya un error vamos a mandar una respuesta del tipo 400
        //junto a un objeto que imprima el error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        //En caso de que este todo OK
        res.json({
            ok: true,
            usuario:{
                usuarioDB
            }
        })
    })
});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    //underscore, metodo pick para determinar que campos se pueden modificar unicamente
    let body = _.pick(req.body, ['body', 'email', 'img', 'role', 'estado']);

    //Busca por id y luego me lo modifica
    //1 param: id a buscar
    //2 param: lo que queremos modificar
    //3 param: options, vamos a regresar el ususario modificado, por lo que new es true
    //         tambien queremos que valide todos los campos
    //4 param: callback (error o usuario encontrado)
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true },
        (err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        })

});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    //Eliminacion fisica del usuario, YA NO SE USA
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     if (!usuarioBorrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         });
    //     }
    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     })
    // });

    let cambiaEstado = {
        estado: false
    }

    //Cambiamos el estado a false, NO HAY ELIMINACION FISICA
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    });

});

module.exports = app;