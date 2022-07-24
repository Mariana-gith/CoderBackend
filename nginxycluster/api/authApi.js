import {obtenerPorNombre} from "../data/dataBaseUsuario.js"

export const autenticar =  (nombre, password) =>{
    try{
        console.log("entre a autenticar")
        const usuario =  obtenerPorNombre(nombre) 
        if(usuario.password !== password ){
            console.log("usuario authApi",usuario)
            console.log("password incorrecto")
            throw new Error("Fallo la autenticacion")
        }
        console.log("usuario authApi",usuario)
        return usuario
    }catch(error){
        throw new Error("Fallo la autenticacion")
    }
}