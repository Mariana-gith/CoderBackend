import {obtenerPorNombre} from "../data/dataBaseUsuario.js"

export const autenticar =  async (nombre, password) =>{
    try{
        const usuario = await obtenerPorNombre(nombre)
        if(usuario.password !== password ){
            throw new Error("Fallo la autenticacion. Contraseña incorrecta.")
        }
        return usuario
    }catch(error){
        throw new Error("Fallo la autenticacion. No existe el usuario.")
    }
}