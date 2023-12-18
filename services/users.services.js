const modelUsuarios = require('./../models/modelUsuarios');
const usuarioModel = require('./../models/modelUsuarios');

module.exports = {
    findAll : async (req, res) => {
        try {
            const usuarios = await usuarioModel.find({});
            return res.status(200).json({state: true, msg: "Recuperar Todos los registros", "data": usuarios});
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    findById : async (req, res) => {
        try {
            console.log(req.params.id);
            const usuario = await usuarioModel.findById(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'usuario no encontrado' });
            }
            return res.status(200).json({state: true, data: usuario});
        } catch (err) {
            return res.status(500).json({ message: 'Error al buscar el usuario' });
        }
    },

    save : async (req, res) => {
        const { id, correo, contraseña, nombre, apellido, DNI, telefono } = req.body;
        console.log(req.body);

        try {
            const nuevoUsuario = new usuarioModel({
                id,
                correo,
                contraseña,
                nombre,
                apellido,
                DNI,
                telefono
            });
    
            const usuarioGuardado = await nuevoUsuario.save();
            return res.status(201).json({ "state": true, "data": usuarioGuardado });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    },

    update : async (req, res) => {
        const {id} = req.params;
        const data = req.body;
        console.log(data);
        try {
            const usuario = await usuarioModel.findById(id);
            if( usuario ){
                if (data.nombre == null || data.apellido == null || data.DNI == null || data.telefono == null) {
                    return res.status(501).json({ status: false, message: "faltan datos"});
                }else{

                    const usuarioActualizado = await usuarioModel.findByIdAndUpdate(id, data, {new: true});
                    return res.status(200).json({ state: true, data: usuarioActualizado });
                }
            }else{
                return res.status(501).json({ status: false, message: "el usuario no existe"});
            }
        } catch (err) {
            console.log(err.message);
            return res.status(400).json({state: false, message: 'Usuario no actualizado' });
        }
    },

    deletear : async (req, res) => {
        try {
            await Usuario.deleteOne({ id: req.params.id });
            return res.json({ message: 'Usuario eliminado' });
        } catch (err) {
            return res.status(500).json({ message: 'Usuario no eliminado'});
        }
    }

}