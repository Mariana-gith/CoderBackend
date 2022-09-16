const socket = io("https://proyectofinal-2022.herokuapp.com/")

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
