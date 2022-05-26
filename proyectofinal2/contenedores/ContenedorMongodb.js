import mongoose from 'mongoose'
import config from '../config.js'
import { objeto,cambiarKey,borrarKey } from '../funciones/funciones.js'

await mongoose.connect(config.mongodb.cnxStr)

class ContenedorMongodb{
    constructor(nombreCol,schema){
        this.collection = mongoose.model(nombreCol,schema)
    }

    async save(producto){
        try{
            let nuevo = await this.collection.insertMany(producto)
            console.log(nuevo)
            nuevo = objeto(nuevo)
            cambiarKey(nuevo,'_id','id')
            borrarKey(nuevo, '__v')
            return nuevo
        }catch(error){
            throw new Error(`no se puede ingresar ${error}`)
        }
    }

    async otenerById(id){
        try{
            let porId = await this.collection.find({_id:id})
            console.log('estoes por id',porId)
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

    async upDateById(nuevoProd){
        try{
            cambiarKey(nuevoProd,'id','_id')
            console.log(nuevoProd)
            let {p,pModificado} = await this.collection.replaceOne({'_id':nuevoProd._id},nuevoProd)
            console.log(p)
            console.log(pModificado)
            if(p === 0 || pModificado ===0){
                throw new Error(`No se puede actualizar`)
            }else{
                cambiarKey(nuevoProd,'_id','id')
                borrarKey(nuevoProd,'__v')
                return objeto(nuevoProd)
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