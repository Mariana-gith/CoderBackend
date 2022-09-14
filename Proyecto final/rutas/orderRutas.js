import { Router } from 'express'
import {obtenerPorUsuario, actualizarCarrito,obtenerTodosCarrito} from '../data/dataBaseCarrito.js'


const orderRutas = new Router()


orderRutas.get("/", async(req,res)=>{
    const usuario = req.user.username
    //Me traigo mi carrito (el de mi usuario)
    const miCarrito = await obtenerPorUsuario(usuario);
    
    // Se lo paso a la vista para que lo muestre como quiera
    res.render("orden", {data: miCarrito.productos, usuario: usuario})
})


orderRutas.get("/comprar", (req,res)=>{
    res.render("compra")
})



export default orderRutas