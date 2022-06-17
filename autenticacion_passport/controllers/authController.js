import dataBaseUsuario from "../data/dataBaseUsuario.js"
import { crearErrorAutenticacion } from "./errorsController.js"


 const autenticar = async(username,password) =>{
    let usuario
    try {
        usuario = await dataBaseUsuario.obtenerPorNombre(username)
    } catch (error) {
        throw crearErrorAutenticacion()        
    }

    if(password !== password){
        throw crearErrorAutenticacion()
    }
    return usuario
}

const authRouter={ 
    login: async (req,res,next)=>{
        const {username,password}= req.body
        try {
           const usuario= await autenticar(username,password)
            req.session.username =username
            req.session.mensaje= `Bienvenid@ ${username}`
            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    },
    logout : async (req,res,next)=>{
        req.session.destroy()
        res.sendStatus(200)
    }
}

export default authRouter