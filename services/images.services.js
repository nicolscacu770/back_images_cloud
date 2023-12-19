const imagenModel = require('../models/modelImages');
const usuarioModel = require('../models/modelUsuarios');

module.exports = {
    findAll : async(req,res) => {
        try {
            const imagens = await imagenModel.find([]);

            return res.status(200).json({state: true, msg: "Recuperar Todos los registros", "data": imagens});
        } catch (error) {
            return res.status(500).json({"state": false, "error": error});
        }
    },

    findById : async(req,res) => {
        const {id} = req.params;
        try {
            const movement = await imagenModel.findById(id);
            if(movement){
                return res.status(200).json({"state": true, "data": movement});    
            }else{
                return res.status(404).json({"state": false, "msg": "elemento no encontrado"});
            }
        } catch (error) {
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
        let dateAct = new Date();
        let founded;

        const fechaHoy = `${dateAct.getDate()}/${dateAct.getMonth()}/${dateAct.getFullYear()}`
        const horaActual = `${dateAct.getHours()}:${dateAct.getMinutes()}:${dateAct.getSeconds()}`;
           
        const { name, type, value} = req.body
        const data = {"id": id, "nombre": name, "tipo": type, "valor": value, "fecha": fechaHoy, "hora": horaActual}

        try {
            for (let pos = 0; pos < datos.imagens.length; pos++) {
                if(datos.imagens[pos].id == id){
                    datos.imagens[pos] = data; 
                    founded = true;
                }
            }

            if(founded){
                
                return res.status(200).json({"state": true, "msg": "elemento actualizado correctamente", "data": data});    
            }else{
                return res.status(404).json({"state": false, "msg": "elemento no encontrado"});
            }
        } catch (error) {
            return res.status(500).json({"state": false, "error": "no available :v"});
        }
    },

    deletear : async(req,res) => {
        const {id} = req.params;
        let founded;
        try{
            for (let pos = 0; pos < datos.imagens.length; pos++) {
                if(datos.imagens[pos].id == id){
                    datos.imagens.splice(pos, 1);
                    founded = true;
                }
            }

            if(founded){
                let datosJSON = JSON.stringify(datos);
                fs.writeFileSync('data.json', datosJSON);
                return res.status(200).json({"state": 200, "msg": "elemento eliminado correctamente"});    
            }else{
                return res.status(404).json({"state": false, "msg": "elemento no encontrado"});
            }
        }catch(error){
            return res.status(500).json({"state": false, "error": "no available :v"});
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