'use strict';
const mongoose = require('mongoose');

const schemmaUsuario = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mensualidad: { type: Number, required: true },
    fondos: { type: Number, required: true }
},{
    writeConcern: {
       w: 'majority',
       j: true,
       wtimeout: 1000
    }});

module.exports = mongoose.model('Usuario', schemmaUsuario, 'usuarios')