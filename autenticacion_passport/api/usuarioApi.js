import { crearUsuario } from "../models/usuariosModel.js";
import  {nombreUnico,guardar} from "../data/dataBaseUsuario.js"

export const registrarUsuario = (usuarioDatos) =>{
    if(!usuarioDatos){
        throw new Error("req invelida")
    }
    nombreUnico(usuarioDatos.username)
    const usuario= crearUsuario(usuarioDatos)
    guardar(usuario)
    return usuario
}