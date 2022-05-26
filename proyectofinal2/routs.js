import  express  from 'express'

const { Router } = express

const productosRouter = new Router()

import{
    productosdao as productosdaos,
    carrosDao as  carrosDaos
    } from './daos/daos.js'

const app = express()


productosRouter.get("/",async(req,res)=>{
    const todos = await productosdaos.getAll()
    res.json(todos)
})

productosRouter.get('/:id',async(req,res)=>{
    const porId = await productosdaos.obtenerById(req.params.id)
    res.json(porId)
})

productosRouter.post("/",async(req,res)=>{
    const productos = await productosdaos.save(req.body)
    res.json(productos)
})

productosRouter.put("/:id",async(req,res)=>{
    let params = req.body
    params.id = req.params.id
    const actualizado = await productosdaos.upDateById(params)
    res.json(actualizado)
})

productosRouter.delete('/:id', async(req,res)=>{
    const borrados = await productosdaos.deleteById(req.params.id)
    res.json(borrados)
})



//----

const carritosRouter = new Router()

carritosRouter.get("/",async(req,res)=>{
    const todos = await carrosDaos.getAll()
    res.json(todos.map(c=>c.id))
})
carritosRouter.post("/",async(req,res)=>{
    const productos = (Object.keys(req.body).length === 0) ? await carrosDaos.save() : await carrosDaos.save(req.body)
    res.json(productos)
})

carritosRouter.delete('/:id', async(req,res)=>{
    const borrados = await carrosDaos.deleteById(req.params.id)
    res.json(borrados)
})

//----

carritosRouter.get("/:id/productos", async(req,res)=>{
    const carritoN = await carrosDaos.obtenerById(req.params.id)
    res.json(carritoN.productos)
})

carritosRouter.post("/:idCarrito/:idProducto", async (req,res)=>{
    let carritoN = {}
    try{
        carritoN= await carrosDaos.obtenerById(req.params.idCarrito)
        const productoN= await productosdaos.obtenerById(req.params.idProducto)
        carritoN.productos.push(productoN)
        await carrosDaos.upDateById(carritoN)
    }catch(e){
        res.status(404).send(`No se pudo actualizar el carrito ${e}`)    
    }
    res.json( carritoN)
})

carritosRouter.delete("/:id/:prodId",async(req,res)=>{
    const carritoN = await carrosDaos.obtenerById(req.params.id)
    const index = carritoN.productos.findIndex(p => p.id === req.params.prodId)
    if(index != -1){
        carritoN.productos.splice(index,1)
        await carrosDaos.upDateById(carritoN)
    }
    res.end()
})


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/productos",productosRouter)
app.use("/carritos",carritosRouter)



export default app