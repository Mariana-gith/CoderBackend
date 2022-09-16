import ContenedorMongodb from '../contenedores/ContenedorMongodb.js'

class OrdersdaosMongodb extends ContenedorMongodb{
    constructor(){
        super('orders',{
            usuario: {type:String, required:true},        
            productos: {type: []}
        }) 
    }

    async obtenerPorUsuario( usuario) {
        return await this.collection.find( { usuario: usuario } )
    }
}

export default OrdersdaosMongodb