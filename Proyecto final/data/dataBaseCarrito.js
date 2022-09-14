import CarritoDAO from '../daos/CarritoDAO.js'


const carritoDao = new CarritoDAO()

export const carroNuevo = async ( carrito = { productos:[], usuario: "" } ) => {
    await carritoDao.save(carrito)
}

export const actualizarCarrito = async (carrito) => {
    await carritoDao.upDateById(carrito)
}

export const obtenerPorUsuario = async ( usuario ) => {
    return await carritoDao.obtenerPorUsuario(usuario)
}

export const obtenerPorId = (id) =>{
    const porId = carritoDao.deleteById(id)
    return porId
}


export const borrarProducto = (id) =>{
    const borrado= carritoDao.deleteById(id)
    return borrado 
}

export const obtenerTodosCarrito= () =>{
    return carritoDao.getAll()
}