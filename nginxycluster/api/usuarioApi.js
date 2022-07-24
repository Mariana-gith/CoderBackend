import { crearUsuario } from "../models/usuariosModel.js";
import  {nombreUnico,guardar} from "../data/dataBaseUsuario.js"

export const registrarUsuario = (usuarioDatos) =>{
    console.log(usuarioDatos)
    if(!usuarioDatos){
        throw new Error("req invelida")
    }
    nombreUnico(usuarioDatos.username)
    const usuario= crearUsuario(usuarioDatos)
    console.log("usuario guardar",usuario)
    guardar(usuario)
    return usuario
}