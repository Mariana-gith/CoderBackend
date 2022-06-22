


export const crearUsuario =(datos)=>{
    if(!datos.username){
        throw new Error("Falta ingresar username")
    }
    if(!datos.password){
        throw new Error("Falta ingresar pasword")
    }
    if(!datos.address){
        throw new Error("Falta ingresar address")
    }

    const usuario ={
        id:Date.now(),
        username:datos.username,
        password :datos.password,
        addres:datos.address
    }
    console.log(usuario)
    return usuario
}