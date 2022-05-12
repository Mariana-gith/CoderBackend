const socket = io()


const cargarProducto = () =>{
    const producto ={
        nombre:document.getElementById('inputNombre').value,
        precio:document.getElementById('inputoPrecio').value,
        foto:document.getElementById('inputoFoto').value
    }
    socket.emit('cargar',producto)
    console.log(producto)
    return false
}

socket.on('productos', mostrarProducto);
async function mostrarProducto(productos) {

    const plantilla = await fetch('plantillahbs/tabla.hbs')
    const texto = await plantilla.text()
    const functionTemplate = Handlebars.compile(texto)
    const html = functionTemplate({ productos })

    document.getElementById('productosHtml').innerHTML = html
}


const mostrarMensajes = (mensajes) =>{
    const mensajesMostrar = mensajes.map((m) =>{
        return `<p> ${m.fecha} <strong> ${ m.Autor} </strong> :  ${ m.Mensaje}</p>`
    }).join(" ")
   
    const listaMensajes = document.getElementById('mensajesHtml')
    listaMensajes.innerHTML = mensajesMostrar
    return 
}


socket.on('mensaje', mensajes=>{
    console.log(mensajes)
    mostrarMensajes(mensajes)
})

const enviarMensaje = () =>{
    const inputMensaje = document.getElementById("inputoMensaje")
    const inputAutor = document.getElementById("inputoAutor")
    if(inputMensaje.value && inputAutor.value ){
        const mensaje = {
            Mensaje:  inputMensaje.value,
            Autor:inputAutor.value
        }
        socket.emit("nuevoMensaje",mensaje)
    }else{
        alert('ingrese algun dato')
    }
}

