const mongoose = require('mongoose');

const {Schema} = mongoose;

const schemaImagen = new Schema( {
    id : {
        type : Number,
        required : true,
        unique : true
    },
    nombre : {
        type : String,
        required : true,
        unique : true
    },
    tamaño : {
        type : Number,
        required : false,
        unique : false
    }, 
    fecha : {
        type : String,
        required : true,
        unique : false
    },
    hora : {
        type : String,
        required : true,
        unique : false
    },
    URL : {
        type : String,
        required : true,
        unique : true
    },

    usuario : {
        type : Schema.Types.ObjectId,
        ref : 'usuario'
    }
})

module.exports = mongoose.model('imagen', schemaImagen);