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
    nuevoUsario.save().then((respuesta)=>{
        res.json({
            msj: 'se registró correctamente',
            dataUser: respuesta
        })
    }).catch((error)=>{
        res.json({
            msj:'ocurrió un error',
            error: error
        })
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
router.put('/actualizar-fondos', (req, res) => {
    Usuario.updateOne({_id: req.body._id},{fondos: req.body.fondos}).then((respuesta)=>{
        res.json({
            output: respuesta.modifiedCount,
            code:200
        })
    }).catch((error)=>{
        res.json({
            msj:'ocurrió un error con la base de datos',
            error: error,
            code:500
        })
    });
});




//eliminar usuario
router.delete('/eliminar-usuarios/:id', (req, res) => {


    Usuario.deleteOne({_id: req.params.id}).then((respuesta)=>{
        res.json({
            output: respuesta.deletedCount,
            code: 200
        })
    }).catch((error)=>{
        res.json({
            msj: 'Error de conexion con base de datos',
            error: error,
            code: 500
        })
    })


});

    




//siempre debe ir al final del archivo.route para poder levantar el servidor
module.exports = router;