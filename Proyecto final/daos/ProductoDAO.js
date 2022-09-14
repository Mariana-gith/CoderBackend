import ContenedorMongodb from "../contenedores/ContenedorMongodb.js"

class ProductoDAO extends ContenedorMongodb{
    constructor(){
        super('productos',{
            name: {type:String, require:true} ,        
            price: {type:String},        
            picture: {type:String},
        })
    }
}

export default ProductoDAO;