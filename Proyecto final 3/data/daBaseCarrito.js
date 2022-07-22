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