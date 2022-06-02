import { normalize ,schema } from "normalizr";
import util  from 'util'

const normalizador = (mensajeria) =>{
    const autorSchema = new schema.Entity('autor',{idAttribute: 'id'})
    const mensajeSchema = new schema.Entity('mensaje')
    const mansajeriaSchema = new schema.Entity('mensajes',{
        autor:autorSchema,
        mensaje:mensajeSchema
    })
    const postSchema = new schema.Entity('posteo',{
        mensajes:[mansajeriaSchema]
    })

    const print = (obj) =>{
        console.log(util.inspect(obj,false,12,true))
    }

    const normalizado = normalize(mensajeria,postSchema)
    print(normalizado)
    console.log("Ojeto original ",JSON.stringify(mensajeria).length) 
    console.log("Ojeto normalizado ",JSON.stringify(normalizado).length) 
    return JSON.stringify(normalizado).length
}

export default normalizador