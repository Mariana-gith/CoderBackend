
const usuariosArray = []


export const guardar = async (usuario) =>{
    usuariosArray.push(usuario)
    return usuario
}
export const obtenerTodos= async () =>{
    return usuariosArray
}
export const obtenerPorNombre = async (nombre)=>{
    const usuarioEncontrado = usuariosArray.find(n=> n.nombre === nombre) 
    if(!nombre) throw new Error('no existe un usuario con ese nombre')
    return usuarioEncontrado
}
export const nombreUnico = async (nombre)=>{
    const usuarioEncontrado = usuariosArray.find(n=> n.nombre === nombre) 
    if(!nombre) throw new Error('el nombre de usuario no está disponible')
    return usuarioEncontrado
}
export const obtenerPorId = async(id)=>{
    const usuarioEncontrado = usuariosArray.find(u=>u.id === id)
    if(!id) throw new Error('no existe un usuario con ese id')
    return usuarioEncontrado

}

