import ContenedorMongodb from "../contenedores/ContenedorMongodb.js"
import {objeto, cambiarKey, borrarKey} from '../contenedores/funciones.js'

class UsuarioDAO extends ContenedorMongodb{
    constructor(){
        super('usuarios',{
            username: {type:String, require:true} ,        
            password: {type:String},         
            address:{type:String},
        })
    }

    async getByName(username){
        try{
            let porName = await this.collection.find({username: username})
            if(porName.length === 0){
                throw new Error('No se encontro el usuario con ese nombre')
            }else{
                const usuario = cambiarKey(objeto(porName[0]),'_id','id')
                return usuario
            }
        }catch(error){
            throw new Error(`No se encontro el nombre ${error}`)
        }
    }

}

export default UsuarioDAO;