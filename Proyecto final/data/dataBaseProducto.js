import ProductoDAO from "../daos/ProductoDAO.js"

const productoDAO = new ProductoDAO()

/********************* FUNCIONES PRODUCTOS  *****************/
// Productos cuyo nombre empiece con la letra que me pasaron 

export const guardar = (producto,id) =>{
    return productoDAO.save(producto,id)
     
}

export const obtenerTodos= () =>{
    return productoDAO.getAll()
}

export const obtenerPorId = (id) =>{
    return productoDAO.getById(id)
}



export const actualizarPorId = (id) =>{
    return productoDAO.upDateById(id)
}

export const borrarPorId = async (id) =>{
    return await productoDAO.deleteById(id)
}



export const nameStartsWith = async (letra) => {
    //Me traigo todos
    const productos = await productoDAO.getAll();
    const filtrados = productos.filter((producto) => producto.name.startsWith(letra) )
    return filtrados;
}

// Productos cuyo nombre incluya el sub string que me pasaron 
export const nameIncludes = async (subStr) => {
    const productos = await productoDAO.getAll();
    const filtrados = productos.filter((producto) => producto.name.includes(subStr))
    return filtrados;
}

export const productsPriceLessThan = async (price) => {
    //Me traigo todos
    const productos = await productoDAO.getAll();
    // Filtro los que tienen precio menor que el que me pasaron
    // Es un string asi que cuidado con los numeros y el $
    const filtrados = productos.filter((producto) => producto.price < price);
    return filtrados
}

export const productsPriceGreaterThan = async (price) => {
    //Me traigo todos
    const productos = await productoDAO.getAll();
    // Filtro los que tienen precio menor que el que me pasaron
    // Es un string asi que cuidado con los numeros y el $
    const filtrados = productos.filter((producto) => producto.price > price);
    return filtrados
}

export const productsPriceBetween = async (priceMin, priceMax) => {
    //Me traigo todos
    const productos = await productoDAO.getAll();
    // Filtro los que tienen precio menor que el que me pasaron
    // Es un string asi que cuidado con los numeros y el $
    const filtrados = productos.filter((producto) => (producto.price > priceMin && producto.price < priceMax) );
    return filtrados
}



//carrito

let carro = []

export const agregarACarrito = ( carrito = {productos:[]} ) => {
    let carritos ={
        id: carrito.length + 1,
        producto:carrito
    }
    carro.push(carritos)
}

export const eliminarProductoDeCarrito = (name) => {
    carrito = carrito.filter((producto) => producto.name !== name);
}

export const obtenerProductosCarrito = () => carrito