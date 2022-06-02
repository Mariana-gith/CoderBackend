const socket = io()


const mostrarMensajes = (mensajes) =>{
    const mensajesMostrar = mensajes.map((m) =>{
        return `<p> <strong> ${ m.inputoAutorNombre} </strong> :  ${ m.inputMensaje}</p>`
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
    const inputoAutorNombre = document.getElementById("inputoAutorNombre")
    const inputoAutorApellido = document.getElementById("inputoAutorApellido")
    const inputoAutorEdad = document.getElementById("inputoAutorEdad")
    const inputoAutorAlias = document.getElementById("inputoAutorAlias")
    if(inputMensaje.value && inputoAutorNombre.value ){
        const mensaje = {
        autor:{
            id: inputoAutorAlias.value,
            Nombre: inputoAutorNombre.value, 
            apellido: inputoAutorApellido.value, 
            edad: inputoAutorEdad.value, 
        },
        Mensaje:  inputMensaje.value,
       
        }
        
        socket.emit("nuevoMensaje",mensaje)
        console.log("nuevoMensajeConsol",mensaje)
    }else{
        alert('ingrese algun dato')
    }
}

