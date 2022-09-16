import { Router } from 'express'
import {obtenerTodos} from '../data/daBaseCarrito.js'



const carritoRuta = new Router()

const usuario = "Mariana"


carritoRuta.get("/", async(req,res)=>{
    const usuario = req.session.user
    const productos= await obtenerTodos()
    console.log("usuario", productos)
    res.render("carrito",{data:productos, usuario:usuario})
})




export default carritoRuta