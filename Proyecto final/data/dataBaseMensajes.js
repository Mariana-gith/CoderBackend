import MensajesdaosMongodb from "../daos/MensajesDAO.js";

const mensajesDAO = new MensajesdaosMongodb()


export const obtenerTodosMensajes = async() =>{
       return await mensajesDAO.getAll()
}

export const guardarMensaje = async (mensaje) =>{
    const guardado = await mensajesDAO.save(mensaje)
    return guardado
}