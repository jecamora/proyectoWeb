'use strict';

const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios.model');


//Registrar usuario ruta
router.post('/registrar-usuario', (req, res) => {
    let nuevoUsario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        mensualidad: req.body.mensualidad,
        fondos: req.body.fondos
    });
    nuevoUsario.save((error) => {
        if (error) {
            res.json({
                msj: 'Ocurrio un erorr al registrar el usuario',
                error
            });
        } else {
            res.json({
                msj: 'El usuario se registró exitosamente'
            });
        }
    });


});

//Obtener usuarios ruta
router.get('/obtener-usuarios', (req, res) => {
    Usuario.find({}, (error, respond) => {
        if (error) {
            res.json({
                msj: 'ocurrio un error',
                error
            })
        } else {
            res.json({
                msj: 'usuarios obtenidos',
                usuarios: respond
            })
        }
    })
});
//modificar o actualizar usuario ruta
router.put('/modificar-usuario', (req, res) => {});
//eliminar usuario
router.delete('/eliminar-usuarios', (req, res) => {});

//siempre debe ir al final del archivo.route para poder levantar el servidor
module.exports = router;