

 import admin from "firebase-admin"
 import fs from 'fs'

const serviceAccount = JSON.parse(fs.readFileSync("./db/normalizr-dffd7-firebase-adminsdk-mrnge-d08dd18f70.json","utf-8"))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://carbon-nucleus-264418.firebaseio.com"
});

 console.log('Base Firebase conectada!')



// admin.initializeApp({
//   credential: admin.credential.cert(config.firesbase)
// })

const db = admin.firestore()

class ContenedorFirebase {
    constructor(collection){
        this.nombreCollection=db.collection(collection)
    }

    async save(nuevoProd){
      try{
        const producto = await this.nombreCollection.add(nuevoProd)
        return{ ...nuevoProd, id: producto.id }
      }catch(error){
        throw new Error(`no se pudo guardar ${error}`)
      }
    }

    async obtenerById(id){
      try{
        const producto = await this.nombreCollection.doc(id).get()
         if(!producto.exists){
            throw new Error('No se encontro el producto')
         }else{
           const select = producto.data()
           return {...select, id}
         }
      }catch(error){
        throw new Error(`no se encontro el producto ${error}`)
      }
    }

    async getAll(){
      try{
          const todos = []
          const collection = await this.nombreCollection.get()
          collection.forEach(p=>{
            todos.push({id:p.id, ...p.data()})})
          return todos
      }catch(error){
        throw new Error('No hay productos para mostrar',error)
      }
    }
    
    async deleteById(id){
      try{
        const borrado = this.nombreCollection.doc(id).delete()
        return borrado
      }catch(error){
        throw new Error('No se puede borrar',error)
      }
    }

    async upDateById(actualizado){
      try{
        const nuevo = this.nombreCollection.doc(actualizado.id).update(actualizado)
        return nuevo
      }catch(error){
        throw new Error('No se puede actualizar',error)
      }
    }
    
}

export default ContenedorFirebase