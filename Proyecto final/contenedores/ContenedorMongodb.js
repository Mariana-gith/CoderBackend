import mongoose from 'mongoose'
import {objeto, cambiarKey, borrarKey} from './funciones.js'

await mongoose.connect(process.env.MONGO_URL)

class ContenedorMongodb{
    constructor(nombreCol,schema){
        this.collection = mongoose.model(nombreCol,schema)
    }

    async save(elemento){
        try{
            let nuevo = await this.collection.insertMany(elemento)
            nuevo = objeto(nuevo)
            cambiarKey(nuevo,'_id','id')
            borrarKey(nuevo, '__v')
            return nuevo
        }catch(error){
            throw new Error(`no se puede ingresar ${error}`)
        }
    }

    async getById(id){
        try{
            let porId = await this.collection.find({_id:id})
            if(porId.length===0){
                throw new Error('No se encontro el id')
            }else{
                const producto = cambiarKey(objeto(porId[0]),'_id','id')
                return producto
            }
        }catch(error){
            throw new Error(`No se encontro el id ${error}`)
        }
    }

    async getAll(){
        try{
            let todos = await this.collection.find({}, { __v: 0 })
            todos = todos.map(objeto)
            todos = todos.map(d => cambiarKey(d, '_id', 'id'))
            return todos

        }catch(error){
            throw new Error(`No se encontraron productos, ${error}`)
        }
    }

    async upDateById(nuevoElemento){
        try{
            cambiarKey(nuevoElemento,'id','_id')
            let {p,pModificado} = await this.collection.replaceOne({'_id':nuevoElemento._id},nuevoElemento)
            if(p === 0 || pModificado ===0){
                throw new Error(`No se puede actualizar`)
            }else{
                cambiarKey(nuevoElemento,'_id','id')
                borrarKey(nuevoElemento,'__v')
                return objeto(nuevoElemento)
            }
        }catch(error){
            throw new Error(`No se puede actualizar ${error}`)
        }
    }

    async deleteById(id){
        try{
            const{p,pBorrado}= await this.collection.deleteOne({'_id':id})
            if(p ===0 || pBorrado === 0){
                throw new Error('No se puede borrar')
            }
        }catch(error){
            throw new Error(`No se puede borrar ${error}`)
        }
    }

    async deleteAll(){
        try{
            await this.collection.deleteMany({})

        }catch(error){
            throw new Error(`No se puede borrar todo ${error}`)
        }
    }
}


export default ContenedorMongodb