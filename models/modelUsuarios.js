const mongoose = require('mongoose');

const {Schema} = mongoose;

const schemaUsuario = new Schema( {
    id : {
        type : Number,
        required : true,
        unique : true
    },
    correo : {
        type : String,
        required : true,
        unique : true
    },
    contraseña : {
        type : String,
        required : true,
        unique : true
    },
    nombre : {
        type : String,
        required : true,
        unique : true
    },
    apellido : {
        type : String,
        required : true,
        unique : true
    }, 
    DNI : {
        type : String,
        required : true,
        unique : true
    },
    telefono : {
        type : Number,
        required : true,
        unique : true
    },

    imagenes : [
        {
            type : Schema.Types.ObjectId,
            ref : 'imagen'
        }
    ]
})

module.exports = mongoose.model('usuario', schemaUsuario);