import ContenedorMongodb from '../../contenedores/ContenedorMongodb.js'

class ContenedordaosMongodb  extends ContenedorMongodb{
        constructor(){
            super('productos',{

                nombre: {type:String, require:true} ,        
                precio: {type:Number},         
                foto:{type:String},
            })
            
        }
           
}

export default ContenedordaosMongodb