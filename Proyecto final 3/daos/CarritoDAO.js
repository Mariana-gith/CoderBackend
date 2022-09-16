import ContenedorMongodb from '../contenedores/ContenedorMongodb.js'

class CarritodaosMongodb  extends ContenedorMongodb{
    constructor(){
        super('productos')
        
    }
    async guardar (carrito ={productos:[]}){
        return await super.guardar(carrito) 
    }
}

export default CarritodaosMongodb