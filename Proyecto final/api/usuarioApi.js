import { crearUsuario } from "../models/usuariosModel.js";
import  {nombreUnico, guardar} from "../data/dataBaseUsuario.js"

export const registrarUsuario = async (usuarioDatos) =>{
    if(!usuarioDatos){
        throw new Error("req invelida")
    }
    await nombreUnico(usuarioDatos.username)
    const usuario= crearUsuario({...usuarioDatos, role: 'client'})
    guardar(usuario)
    return usuario
}