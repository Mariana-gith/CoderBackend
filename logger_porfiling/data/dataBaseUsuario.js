import logger from "../logger/logger.js"


const usuariosArray = []



export const guardar = (usuario) =>{
    usuariosArray.push(usuario)
    return usuario
}
export const obtenerTodos= () =>{
    return usuariosArray
}
export const obtenerPorNombre = (nombre)=>{
    const usuarioEncontrado = usuariosArray.find(n=> n.username === nombre) 
    logger.info("usuarioEncontrado",usuarioEncontrado)
    logger.info("usuariosArray",usuariosArray)
    if(!usuarioEncontrado)  logger.error("no existe un usuario con ese nombre")
    //throw new Error('no existe un usuario con ese nombre')
    return usuarioEncontrado
}
export const nombreUnico = (nombre)=>{
    const existeUsuario= usuariosArray.some(u=>u.username === nombre)
    if(existeUsuario){
        logger.warn("El usuario ya existe")
        // throw new Error("El usuario ya existe")
    }
}
export const obtenerPorId = (id)=>{
    const usuarioEncontrado = usuariosArray.find(u=>u.id === id)
        if(!id) logger.warn("El usuario ya existe") 
      //throw new Error('no existe un usuario con ese id')
    return usuarioEncontrado
}