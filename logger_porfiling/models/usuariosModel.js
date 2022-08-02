import logger from "../logger/logger.js"



export const crearUsuario =(datos)=>{
    if(!datos.username){
        logger.error("Falta ingresar username")
    }
    if(!datos.password){
        logger.error("Falta ingresar pasword")
    }
    if(!datos.address){
        logger.error("Falta ingresar address")
    }

    const usuario ={
        id:Date.now(),
        username:datos.username,
        password :datos.password,
        address:datos.address
    }
    return usuario
}