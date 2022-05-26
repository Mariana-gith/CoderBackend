import ContenedorFirebase from "../../contenedores/ContenedorFirebase.js";

class CarritodaosFirebase extends ContenedorFirebase{
    constructor(){
        super('carritos')
    }

    async save (carrito = {productos:[]}){
        return await super.save(carrito)
    }
}

export default CarritodaosFirebase