const fs = require ("fs")

// fs.writeFile('prueba.txt', 'Algo...\n'.repeat(10), ()=>{ })

 
//  const  trabajoConArchivos =async ()=>{
//     try{
//        await fs.promises.writeFile('prueba2.txt', 'Algo asincronico...\n'.repeat(20))
//         const datos = await fs.promises.readFile('prueba2.txt','utf-8')
//         console.log(datos)
//     }
//     catch(err){
//         console.log(err)
//     }finally{
//         console.log('termine')
//     }    
// }

// trabajoConArchivos()
// console.log(10+10)


const leerProductos = async (nombre) =>{
    try{
        return JSON.parse(await fs.promises.readFile(nombre,"utf-8"));
    }catch{
        return [];
    }
};

const obtenerId = (array, id) =>{
    const obtenerId = array.find(p =>p.id ==id)
    if(!obtenerId) return {error:"producto no encontrado"}
    return obtenerId
}

const borrarPorId = (array,id) =>{
    return  array.filter(p=> p.id !==id)
     
}


const producto =                                                                                                                                                  
{                                                                                                                                                    
  title: 'Escuadra',                                                                                                                                 
  price: 123.45,                                                                                                                                     
  thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
}


 class Contenedor{
    constructor(nombre){
        this.nombre=nombre
        this.pr = []
    }
    
    async save (objeto){
        let productos = await leerProductos(this.nombre)
        
            if( productos.length > 0){
                console.log((await productos).length)
                objeto.id = productos.length + 1;
                productos.push(objeto);
                this.pr = productos;
                await fs.promises.writeFile(this.nombre,JSON.stringify(this.pr, null,2), "utf-8")
                console.log(objeto.id)
            }else{
                objeto.id =1
                this.pr.push(objeto)
                await fs.promises.writeFile(this.nombre,JSON.stringify(this.pr, null,2), "utf-8")
                console.log(objeto.id)
            }
    }

    async getById(number) {
        if(this.pr.length > 0){
            return obtenerId(this.pr, number)
        }else{
            let productos = await leerProductos(this.nombre)
            return obtenerId(productos, number)
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
 
 const ejecutar = async () =>{
    const contenedor = new Contenedor('productos.txt')
    console.log("Producto nuevo",await  contenedor.save(producto))
    console.log("Producto elegido",await contenedor.getById(10))
    console.log( "Todos Los Productos...",await contenedor.getAll())
    console.log( "Productos actualizados...",await contenedor.deleteById(5))
   // console.log( "Todos Los Productos......",await contenedor.deleteAll())
 }

 ejecutar()
1