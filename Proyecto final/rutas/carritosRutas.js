import { Router } from 'express'
import {obtenerPorUsuario, actualizarCarrito,obtenerTodosCarrito} from '../data/dataBaseCarrito.js'
import {obtenerPorId as obtenerProductoPorId} from '../data/dataBaseProducto.js'

const carritoRuta = new Router()

carritoRuta.get("/", async(req,res)=>{
    const usuario = req.user.username
    //Me traigo mi carrito (el de mi usuario)
    const miCarrito = await obtenerPorUsuario(usuario);
    
    // Se lo paso a la vista para que lo muestre como quiera
    res.render("carrito", {data: miCarrito.productos, usuario: usuario})
})

//Ruta para compra
carritoRuta.post("/", async(req,res)=>{
    const usuario = req.user.username
    //Me traigo mi carrito (el de mi usuario)
    const miCarrito = await obtenerPorUsuario(usuario);
    //Le agrego el producto que me pasaron en el request
    const idProducto = req.body.id;
    const productoComprado = await obtenerProductoPorId(idProducto);
    miCarrito.productos.push(productoComprado)
    //Lo actualizo en la base
    await actualizarCarrito(miCarrito);
    res.render("carrito", {data: miCarrito.productos, usuario: usuario})
})

//Ruta para eliminar un producto del carrito. Para el profe.
carritoRuta.delete("/:id", async(req,res)=>{
    const usuario = req.user.username
    //Me traigo mi carrito (el de mi usuario)
    const miCarrito = await obtenerPorUsuario(usuario);
    
    //Le quito el producto que me pasaron en el request
    const idProducto = req.params.id;
    miCarrito.productos = miCarrito.productos.filter((producto) => producto.id !== idProducto)
    
    //Lo actualizo en la base
    await actualizarCarrito(miCarrito);
    res.render("carrito", {data: miCarrito.productos, usuario: usuario})
})

//Ruta para eliminar producto desde el front
carritoRuta.post("/:id", async(req,res)=>{
    const usuario = req.user.username
    //Me traigo mi carrito (el de mi usuario)
    const miCarrito = await obtenerPorUsuario(usuario);
    
    //Le quito el producto que me pasaron en el request
    const idProducto = req.params.id;
    miCarrito.productos = miCarrito.productos.filter((producto) => producto.id !== idProducto)

    //Lo actualizo en la base
    await actualizarCarrito(miCarrito);
    res.redirect("/api/shoppingcartproducts")
})

export default carritoRuta

