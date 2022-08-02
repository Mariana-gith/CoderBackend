import {obtenerPorNombre} from "../data/dataBaseUsuario.js"
import logger from "../logger/logger.js"

export const autenticar =  (nombre, password) =>{
    try{
        const usuario =  obtenerPorNombre(nombre) 
        if(usuario.password !== password ){
            logger.error("password incorrecto")
            throw new Error("Fallo la autenticacion")
        }
        logger.info("usuario authApi",usuario)
        return usuario
    }catch(error){
       logger.error("Fallo la autenticacion")
    }
}