import { obtenerTodos } from "../data/dataBaseUsuario.js";

export const getUsuarios = (req,res) =>{
    const usuarios = obtenerTodos()
    res.json(usuarios)
}