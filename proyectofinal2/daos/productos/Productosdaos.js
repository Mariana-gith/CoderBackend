import ContenedorProductos from "../../contenedores/ContenedorProductos.js";


class Productosdaos extends ContenedorProductos{
    constructor(){
        super('productos.json')
    }
}

export default Productosdaos