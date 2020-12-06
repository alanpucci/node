const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const app = express();

//Lgin de usuario
app.post('/login', (req, res) => {
    let body = req.body;
    //Buscamos un usuario que coincida con el email que recibimos 
    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: true,
                err
            })
        }
        //si no encontramos el usuario
        if (!usuarioDB) {
            return res.status(400).json({
                ok: true,
                err: {
                    message: `(Usuario) o contrasena incorrectos`
                }
            })
        }
        //si encontramos el usuario, encriptamos la contrasena recibida para comparar
        //Esta funcion regresa true si las contrasenas coinciden
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: true,
                err: {
                    message: `Usuario o (contrasena) incorrectos`
                }
            })
        }
        //Creacion del token, dentro del objeto le pasamos el payload del token
        //en este caso, el usuario en cuestion
        //le pasamos el secret
        //le pasamos el tiempo de expiracion en segundos, en este caso 30 dias
        let token = jwt.sign({
                usuario: usuarioDB
            }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })
            //En caso de coincidir todo, mostramos el usuario y el token
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })
    })
})

//Configuraciones de google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    //Como es una funcion async, me va a retornar una promesa
    //Retornamos los valores del usuario
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

//Declaramos un async para poder utilizar el await dentro
app.post('/google', async(req, res) => {
    let token = req.body.idtoken;
    let googleUser = await verify(token)
        //Agarramos el error en caso de que haya alguno
        .catch(e => {
            return res.status(403).json({
                ok: false,
                err: e
            })
        })
        //Buscamos en la DB si existe un usuario con el mismo email de google
    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        //Si el usuario ya esta creado con ese mail, debo permitirle logearse
        //En caso de que no exista ese email, debo permitirle crear el usuario
        if (usuarioDB) {
            //Si el usuario existe, pero no fue creado por googleSignIn, no le permito el login
            if (usuarioDB.google === false) {
                return res.status(400).json({
                        ok: false,
                        err: {
                            message: `No es un usuario creado por Google`
                        }
                    })
                    //En caso de que haya sido creado con google, le renuevo el token
            } else {
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })
                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            }
            //En caso de que el usuario no exista y quiera crearlo con google
        } else {
            let usuario = new Usuario();
            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = 'blabla' //No necesito el password

            usuario.save((err, usuarioDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                    })
                }
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })
                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            })
        }
    })
})

module.exports = app;