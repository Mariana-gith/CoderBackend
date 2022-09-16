import CarritoDAO from '../daos/CarritoDAO.js'


const carritoDao = new CarritoDAO()

export const obtenerTodos= () =>{
    return carritoDao.getAll()
}