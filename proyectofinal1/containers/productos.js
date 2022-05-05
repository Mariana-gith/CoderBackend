const fs = require('fs')


const leerProductos = async (nombre) =>{
    try{
        return JSON.parse(await fs.promises.readFile(nombre,"utf-8"));
    }catch{
        return [];
    }
};

const obtenerId = (array, id) =>{
    const obtenerId = array.find(p =>p.id ==id)
    if(!obtenerId) return {error:"no se encontro el producto"}
    return obtenerId
}

const borrarPorId = (array,id) =>{
    return  array.filter(p=> p.id != parseInt( id))
}


const producto = {                                  
        title: 'Lapiz',                      
        price: 123.45,                          
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
    }


 class Productos{
    constructor(nombre){
        this.nombre=nombre
        this.pr = []
    }
    
    async save (producto){
        let productos = await leerProductos(this.nombre)
        let productosLength =productos.length
            producto.forEach((p,i)=>{
                p.id = productosLength+ i + 1 
                productos.push(p)
                console.log(p.id)
            });
            this.pr = productos;
            await fs.promises.writeFile( this.nombre,JSON.stringify(this.pr, null,2), "utf-8");7
            return productos.id;
      
    }

    async getById(id) {
        if(this.pr.length > 0){
            return obtenerId(this.pr, id)
        }else{
            let productos = await leerProductos(this.nombre)
            return obtenerId(productos, id)
        }
    }
    
    async getAll(){
        let todo =await leerProductos(this.nombre)
        if(todo.length > 0){
            return todo
        }else{
            return {error:"no hay productos"}
        }
    }
    
    async upDateById (nuevoProd){
        this.pr = await leerProductos(this.nombre)
        let indice= this.pr.findIndex(p=>{
            return p.id == nuevoProd.id
        })
        console.log(indice)
        this.pr[indice] = nuevoProd
        await fs.promises.writeFile(this.nombre,JSON.stringify(this.pr,null,2),"utf-8");
    }


    async deleteById(id){
        this.pr =await leerProductos(this.nombre)
        this.pr = borrarPorId(this.pr,id)
        fs.promises.writeFile(this.nombre,JSON.stringify(this.pr,null,2),"utf-8")
        return this.pr
    }

    async deleteAll(){
        fs.promises.writeFile(this.nombre, "" ,"utf-8")
        return {mensaje: "Se borraron todos los productos"}
    }
 }
 
 const  ejecu = async () =>{
    let contenedor = new Productos("productos.json");

    // console.log(await contenedor.save(producto))
 }

ejecu()

module.exports.Productos=Productos