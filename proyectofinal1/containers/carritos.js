const fs = require("fs")



const obtenerCarritos = async (nombre) =>{
    try{
        return JSON.parse(await fs.promises.readFile(nombre,"utf-8"));
    }catch{
        return [];
    }
};

const borrarPorId =  (array, id) =>{
    return array.filter((i)=>i.id != id);
}

const obtenerPorId = (array, id) =>{
    const obtenerId = array.find(p =>p.id ==id)
    return obtenerId
}



class Carrito {
    constructor(id){
        this.id= id,
        this.productos=[]
    }
}

class Carritos{
    constructor(nombre){
        this.nombre=nombre
    }

    async agregarCarrito(){
        let carritos = await obtenerCarritos(this.nombre)
        let nuevoId = carritos.length > 0 ? (carritos.length + 1) : 1
        let carritoNuevo= new Carrito(nuevoId)
        carritos.push(carritoNuevo)
        await fs.promises.writeFile( this.nombre,JSON.stringify(carritos, null, 2), "utf-8");
        return nuevoId
    }

    async eliminarCarrito(id){
        let carritos = await obtenerCarritos(this.nombre)
        console.log(" antes ", carritos)
        carritos = borrarPorId(carritos,id)
        console.log( " despues ", carritos)

        await fs.promises.writeFile(this.nombre,JSON.stringify(carritos,null,2),"utf-8");
    }

    async obtenerTodos(){
        return await obtenerCarritos(this.nombre)
    }

    async agregarProductos(productosNuevos,id){
        let carritos = await obtenerCarritos(this.nombre)
        let carrito = obtenerPorId(carritos,id)
        if(!carrito)return null
        let largo  = carrito.productos.length
        productosNuevos.forEach((p,i)=>{
            p.id = largo + i + 1 
            carrito.productos.push(p)
        });
        let indice = carritos.findIndex((c)=>c.id === carrito.id)
        carritos[indice]= carrito 
        await fs.promises.writeFile(this.nombre,JSON.stringify(carritos,null,2),"utf-8");

    }

    async eliminarProducto(idCarrito,idProducto){
        let carritos = await obtenerCarritos(this.nombre)
        let carrito = obtenerPorId(carritos,idCarrito)
        if(!carrito)return null
        let indiceProducto = carrito.productos.findIndex(p=> p.id == idProducto)
        console.log("indice", indiceProducto)
        if(indiceProducto > -1){
            carrito.productos.splice(indiceProducto,1)
            let indiceCarrito = carritos.findIndex(c=> c.id === carrito.id)
            carritos[indiceCarrito]= carrito
            await fs.promises.writeFile(this.nombre,JSON.stringify(carritos,null,2),"utf-8");
        }else {
            return null
        }
    }

    async obtenerporId(id){
        let carritos = await obtenerCarritos(this.nombre)
        let carrito = obtenerPorId(carritos,id)
        if(carrito){
           return carrito
        }else{
            return null
        }
    }

    
  
}



module.exports.Carritos= Carritos ;

