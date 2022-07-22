import { Router } from 'express'
import {guardar,obtenerTodos} from '../data/dataBaseProducto.js'
import {agregarACarrito} from '../data/daBaseCarrito.js'


const carritoRuta = new Router()

const usuario = "Mariana"


carritoRuta.get("/", async(req,res)=>{
    const usuario = req.session.user
    const productos= await obtenerTodos()
    console.log("usuario", usuario)
    res.render("carrito",{data:productos, usuario:usuario})
})




export default carritoRuta