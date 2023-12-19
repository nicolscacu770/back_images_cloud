const imagenModel = require('../models/modelImages');
const usuarioModel = require('../models/modelUsuarios');

module.exports = {
    findAll : async(req,res) => {
        try {
            const imagens = await imagenModel.find();

            return res.status(200).json({state: true, msg: "Recuperar Todos las imagenes", data: imagens});
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({"state": false, "error": error});
        }
    },

    findById : async(req,res) => {
        const {id} = req.params;
        try {
            const imagen = await imagenModel.findById(id);
            if(imagen){
                return res.status(200).json({"state": true, "data": imagen});    
            }else{
                return res.status(404).json({"state": false, "msg": "imagen no encontrado"});
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({"state": false, "error": error});
        }
        
    },

    save : async(req,res) => {
        const {idUser} = req.params;
        const usuario  = await usuarioModel.findById(idUser);

        const imagen = req.file;
        console.log(imagen);

        console.log(usuario);
        if( usuario ){
            const {originalname, size, imageUrl} = imagen;
            const data = {"id": req.body.id, "nombre": originalname, "tamaño": size, "fecha": getFecha(), "hora": getHora(), URL: imageUrl }

            try {
                const imagen = new imagenModel(data);
                imagen.usuario = usuario;
                const imagenGuardada = await imagen.save();

                usuario.imagenes.push(imagen);
                await usuario.save();
                
                return res.status(200).json({ state: true, message: "imagen guardada", data:imagenGuardada });
            } catch (error) {
                console.log(error);
                return res.status(500).json({"state": false, "error": "no available :v"});
            }
        }else{
            res.status(404).json({ state: false, message: "usuario no encontrado"});
        }
        
    },

    update : async(req,res) => {
        const {id} = req.params;
    },

    deletear : async(req,res) => {
        try{
            const {id} = req.params;
            await imagenModel.deleteOne( {id: id} );
            return res.json({ message: 'Imagen eliminado' });
        }catch(error){
            return res.status(500).json({"state": false, "error": "no available :v", message: "imagen NO eliminada"});
        }
    }
}

function getFecha() {
    let dateAct = new Date();
    const dia = dateAct.getDate();
    const mes = dateAct.getMonth() + 1;
    const año = dateAct.getFullYear();

    return `${dia}/${mes}/${año}`;
}

function getHora() {
    const dateAct = new Date();
    const hora = dateAct.getHours();
    const minutos = dateAct.getMinutes();
    const segundos = dateAct.getSeconds();

    return  `${hora}:${minutos}:${segundos}`;
}