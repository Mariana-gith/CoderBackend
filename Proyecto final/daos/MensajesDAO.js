import ContenedorMongodb from '../contenedores/ContenedorMongodb.js'

class MensajesdaosMongodb extends ContenedorMongodb{
    constructor(){
        super('mensajes',{
            usuario: {type:String, required:true},        
            mensaje: {type: String}
        }) 
    }

}

export default MensajesdaosMongodb