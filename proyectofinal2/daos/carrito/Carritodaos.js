import ContenedorProductos from "../../contenedores/ContenedorProductos.js";

class Carritodaos extends ContenedorProductos{
    constructor(){
        super('carritos.json')
    }
    async guardar ( carritos = {productos:[]} ){
        return new super.guardar(carritos)
    }
}

export default Carritodaos