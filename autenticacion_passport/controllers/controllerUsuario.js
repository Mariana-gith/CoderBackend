import { crearUsuario } from "../models/usuariosModel.js"
import dataBaseUsuario from "../data/dataBaseUsuario.js"

export const usuarioController ={
    post : async (req,res,next) =>{
        try{
            const datosUsuario = req.body
            const usuario = crearUsuario(datosUsuario)
            await dataBaseUsuario.guardar(usuario)
            res.status(201).json(usuario)
        }catch(error){
            next(error)
        }
    },
    get:async (req,res,next)=>{
        try{
            res.json(await dataBaseUsuario.obtenerTodos())
        }
        catch(error){
            next(error)
        }
    }
}