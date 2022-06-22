import {obtenerPorNombre} from "../data/dataBaseUsuario.js"

export const autenticar = (nombre, password) =>{
    let usuario
    try{
        const usuario = obtenerPorNombre(nombre) 
    }catch(error){
        throw new Error("Fallo la autenticacion")
    }
    if(usuario.password !== password ){
        throw new Error("Fallo la autenticacion")
    }
    return usuario

}