import express from "express";
import MensajesDAO from "../../daos/MensajesDAO.js"
import logger from "../../logger/logger.js"



import http from "http"
const app = express()
const serverHttp = http.createServer(app);
import {Server}  from "socket.io"
const io = new Server(serverHttp);

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api", testRouter)

app.use(express.static('public'))


// app.set("views", "./public/views")
// app.set("view engine","ejs")


const mensajesDAO = new MensajesDAO()


io.on('connection',(socket)=>{

socket.emit('mensaje', mensajes)

socket.on("nuevoMensaje",async (mensaje) =>{
    const mensajes = await mensajesDAO.getAll()
    mensajes.push(mensaje)
    io.sockets.emit('mensaje',mensajes)
    await mensajesDAO.save(mensaje)
    .then(()=>{
        logger.info('Registro mensaje Ok!!')
    })
    .catch((err)=>{
        logger.warning(err)
    })

    })
})


serverHttp.listen(8081,()=>{
    logger.info('server OK', 8081)
})