const usuariosArray = []


export const guardar = (usuario) =>{
    usuariosArray.push(usuario)
    return usuario
}
export const obtenerTodos= () =>{
    return usuariosArray
}
export const obtenerPorNombre = (nombre)=>{
    const usuarioEncontrado = usuariosArray.find(n=> n.username === nombre) 
    console.log("usuarioEncontrado",usuarioEncontrado)
    console.log("usuariosArray",usuariosArray)
    if(!usuarioEncontrado) throw new Error('no existe un usuario con ese nombre')
    return usuarioEncontrado
}
export const nombreUnico = (nombre)=>{
    const existeUsuario= usuariosArray.some(u=>u.username === nombre)
    if(existeUsuario){
        throw new Error("El usuario ya existe")
    }
}
export const obtenerPorId = (id)=>{
    const usuarioEncontrado = usuariosArray.find(u=>u.id === id)
    if(!id) throw new Error('no existe un usuario con ese id')
    return usuarioEncontrado
}