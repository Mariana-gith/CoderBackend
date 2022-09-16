import testRouter from "../routs/rutas.js";
import ContenedorFirebase from "../contenedor/contenedorFirebase.js"
import normalizador from "../normalizador/normalizador.js";

import express from "express";
import http from "http"
const app = express()
const serverHttp = http.createServer(app);
import {Server}  from "socket.io"
const io = new Server(serverHttp);


app.use(express.static('public'))
app.use("/api", testRouter)

app.set("views", "./public/views")
app.set("view engine","ejs")

const mensajes = []

const mensajesFire = new ContenedorFirebase('mensajes')

io.on('connection',(socket)=>{
socket.emit('mensaje', mensajes)

socket.on("nuevoMensaje",async (mensaje) =>{
    mensajes.push(mensaje)
    io.sockets.emit('mensaje',mensajes)
    await mensajesFire.save(mensaje)
    .then(()=>{
        console.log('Registro mensaje Ok!!')
    })
    .catch((err)=>{
        console.log(err)
    })
    const todos = await mensajesFire.getAll();
    // const result = []
    // todos.forEach(doc => {
    //     result.push({ id: doc.id, ...doc.todos})})
    
    let objetOrigin = {id:"007",todos}
    const normalizado = normalizador(objetOrigin)
    console.log("normalizado Desde server",normalizado)

})
})


serverHttp.listen(8080,()=>{
    console.log('server OK', 8080)
})