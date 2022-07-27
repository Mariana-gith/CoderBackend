const express = require('express');
const app = express();
const http = require('http');
const serverHttp = http.createServer(app);
const { Server : IOserver } = require("socket.io");
const io = new IOserver(serverHttp);


app.use(express.static('public'))
    
const mensajes = []

    
io.on('connection',(socket)=>{
    socket.emit('mensaje', mensajes)

   
    socket.on("nuevoMensaje", mensaje =>{
        mensaje.fecha = new Date().toLocaleString()
        mensajes.push(mensaje)
        io.sockets.emit('mensaje',mensajes)
    })
})


serverHttp.listen(8080,()=>{
    console.log('server OK', 8080)
})