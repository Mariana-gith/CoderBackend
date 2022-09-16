import express from "express";
import logger from "../../logger/logger.js"

import {obtenerTodosMensajes,guardarMensaje} from "../../data/dataBaseMensajes.js"


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




io.on('connection',async (socket)=>{

    const mensajes = await obtenerTodosMensajes()
    socket.emit('mensaje', mensajes)

    socket.on("nuevoMensaje",async (mensaje) =>{
        await guardarMensaje(mensaje)
        mensajes.push(mensaje)
        io.sockets.emit('mensaje',mensajes)
        .then(()=>{
            logger.info('Registro mensaje Ok!!')
        })
        .catch((err)=>{
            console.log(err)
        })

    })
})

const PORT = process.env.PORT || 8081


serverHttp.listen(PORT,()=>{
    logger.info('server OK', PORT)
})

