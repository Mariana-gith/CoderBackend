import ContenedorMongodb from '../contenedores/ContenedorMongodb.js'

class MensajesdaosMongodb extends ContenedorMongodb{
    constructor(){
        super('mensajes',{
            Nombre: {type:String},        
            Apellido: {type: String},
            Edad: {type: String},
            email: {type: String},
            mensaje: {type: String}
        }) 
    }

}

export default MensajesdaosMongodb