export const objeto = obj => JSON.parse(JSON.stringify(obj))

export const cambiarKey =(nombre, from, to)=>{
    nombre[to] = nombre[from]
    delete nombre[from]
    return nombre
}

export const borrarKey = (nombre, key) =>{
    const value = nombre[key]
    delete nombre[key]
    return value
}