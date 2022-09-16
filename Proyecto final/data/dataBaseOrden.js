import OrderDAO from '../daos/OrderDAO.js'


const orderDao = new OrderDAO()

export const orderNueva = async ( order = { productos:[], usuario: "" } ) => {
    await orderDao.save(order)
}

export const actualizarOrder = async (caderrrito) => {
    await orderDao.upDateById(caderrrito)
}

export const obtenerPorUsuario = async ( usuario ) => {
    return await orderDao.obtenerPorUsuario(usuario)
}

export const obtenerPorId = (id) =>{
    return orderDao.getById(id)
}

export const borrarOrder = (id) =>{
    const borrado= orderDao.deleteById(id)
    return borrado 
}

export const obtenerTodasLasOrds= () =>{
    return orderDao.getAll()
}