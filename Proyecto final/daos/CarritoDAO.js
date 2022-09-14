import ContenedorMongodb from '../contenedores/ContenedorMongodb.js'

class CarritodaosMongodb extends ContenedorMongodb{
    constructor(){
        super('carritos',{
            usuario: {type:String, required:true, unique: true},        
            productos: {type: []}   
        }) 
    }

    async obtenerPorUsuario( usuario) {
        return await this.collection.findOne( { usuario: usuario } )
    }
}

export default CarritodaosMongodb