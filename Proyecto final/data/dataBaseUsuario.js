import UsuarioDAO from "../daos/UsuarioDAO.js"
import logger from "../logger/logger.js"

const usuarioDAO = new UsuarioDAO()

export const guardar = (usuario) =>{
    usuarioDAO.save(usuario)
    return usuario
}

export const obtenerTodos= () =>{
    return usuarioDAO.getAll()
}
export const obtenerPorNombre = async (nombre)=>{
    return await usuarioDAO.getByName(nombre)
}

export const nombreUnico = async (nombre)=>{
    try{
        const usuario = await obtenerPorNombre(nombre);
        // Si encontro un usuario. Es porque el nombre no esta disponible.
        if(usuario){
            throw new Error(`El nombre de usuario ya existe.`)
        }
    }catch(e){
        logger.info("Nombre disponible")
    }
}

export const obtenerPorId = (id)=>{
    return usuarioDAO.getById(id);
}