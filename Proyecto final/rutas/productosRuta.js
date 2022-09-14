import { Router } from 'express'
import {obtenerPorUsuario } from '../data/dataBaseCarrito.js'
import {guardar,obtenerPorId,obtenerTodos, actualizarPorId, borrarPorId} from '../data/dataBaseProducto.js'
import {autorizacionAdmin} from '../middleware/auth.js'



const productosRuta = new Router()

productosRuta.use(function (req, res, next) {
    if(!req.user){
        res.status(401).send('POR ACA NO PASAS EXTRAÑO!');
    }
    next();
})

//Rutas para el front solo con POST y GET

productosRuta.get("/", async(req,res)=>{
    const { username } = req.user.username;
    const productos = await obtenerTodos()
    res.render("cargarProds",{data:productos,usuario: username || "",role: req.user.role})
})

productosRuta.post("/",async (req,res)=>{
    const nuevoProd ={
        name:req.body.name,
        price:req.body.price
    }
    const data= await guardar(nuevoProd)
    const productos = await obtenerTodos()
    res.render("cargarProds", {data:productos,usuario:req.user.username,role: req.user.role})
})

productosRuta.post("/deleteById",autorizacionAdmin, async(req,res)=>{
    const id = req.body.id
    const borradoPorId = await borrarPorId(id)
    const productos = await obtenerTodos()
    res.render("cargarProds", {data:productos,usuario:req.user.username,role: req.user.role})
})

productosRuta.get("/deleteById", async(req,res)=>{
    res.redirect('/api/products/')
})

//Prueba para el profe
productosRuta.put("/:id",autorizacionAdmin, async (req,res)=>{
    let params = req.body
    params.id = req.params.id
    const actualizado = await actualizarPorId(params)
    res.json(actualizado)
})

productosRuta.delete("/:id", autorizacionAdmin, async(req,res)=>{
    const id = req.params.id
    const borradoPorId = await borrarPorId(id)
    const productos = await obtenerTodos()
    res.json(productos);
})

productosRuta.get("/:id",async (req,res)=>{
    const usuario =await  obtenerPorUsuario(req.user.username)
    const id = req.params.id
    const productoPorId= await obtenerPorId(id)
    res.json(productoPorId)
})







export default productosRuta