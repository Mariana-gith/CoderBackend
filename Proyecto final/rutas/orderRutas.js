import { Router } from 'express'
import { orderNueva, obtenerPorUsuario} from '../data/dataBaseOrden.js'
import { obtenerPorId, actualizarCarrito } from '../data/dataBaseCarrito.js'

const orderRutas = new Router()

 orderRutas.get("/", async(req,res)=> {
    const usuario = req.user.username

    //Me traigo mis ordenes (el de mi usuario)
    const ordenes = await obtenerPorUsuario(usuario);
    
    // Se lo paso a la vista para que lo muestre como quiera
    res.json(ordenes);
})

// Creo una orden con todos los productos de un carrito y vacio el carrito
orderRutas.post("/", async (req,res)=>{
    // Obtengo el carrito
    const idCarrito = req.body.idCarrito;
    const carrito = await obtenerPorId(idCarrito);
    const {usuario, productos} = carrito;

    // Creo una nueva orden con los productos de ese carrito
    const nuevaOrder = await orderNueva({productos: productos, usuario: usuario})

    // Actualizo el carrito con un array vacio de productos
    carrito.productos = []
    await actualizarCarrito(carrito);

    res.json({ordenCreada: nuevaOrder, carritoVaciado: carrito});
})

orderRutas.get("/comprar", (req,res)=>{
    res.render("compra")
})

export default orderRutas