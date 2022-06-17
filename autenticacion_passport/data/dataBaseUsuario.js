import { crearErrorNoEncontrado } from "../controllers/errorsController.js";

const usuariosArray = []

export default{
    guardar : async usuario =>{
        usuariosArray.push(usuario)
        return usuario
    },
    obtenerTodos: async  =>{
        return usuariosArray
    },
    obtenerPorNombre: async (nombre)=>{
        const usuarioEncontrado = usuariosArray.find(n=> n.nombre === nombre) 
        if(!nombre) throw crearErrorNoEncontrado()
        return usuarioEncontrado
    }

}