import { crearUsuario } from "../models/usuariosModel.js";
import  {nombreUnico,guardar} from "../data/dataBaseUsuario.js"
import logger from "../logger/logger.js";


export const registrarUsuario = (usuarioDatos) =>{
    if(!usuarioDatos){
        logger.error("req invalida")
    }
    nombreUnico(usuarioDatos.username)
    const usuario= crearUsuario(usuarioDatos)
    logger.info('se registro correctamente',usuario )
    guardar(usuario)
    return usuario
}