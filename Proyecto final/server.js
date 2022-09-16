import express from "express"

import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'http';


import {session } from './middleware/session.js'
import { passportMiddleware, passportSession } from './middleware/passport.js'


import usuariosRouter from "./rutas/usuariosRutas.js"
import authRutas from "./rutas/authRutas.js"
import datosRouter from "./rutas/datosRutas.js"
import infoRutas from "./rutas/infoRutas.js"
import productosRuta from "./rutas/productosRuta.js"
import carritoRuta from "./rutas/carritosRutas.js"
import orderRutas from "./rutas/orderRutas.js"
import MensajesdaosMongodb from "./daos/mensajesDAO.js";




const app = express(); 
let server = createServer(app); 
server = new Server(server);

app.use(express.json())
app.use(session)
app.use(passportMiddleware)
app.use(passportSession)



app.use("/",authRutas)
app.use("/api/usuarios",usuariosRouter)
app.use("/datos",datosRouter)
app.use("/info",infoRutas)
app.use("/api/products",productosRuta)
app.use("/api/shoppingcartproducts",carritoRuta)
app.use("/api/orders",orderRutas)

app.set("views", "./views")
app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use(express.static('public'))
    
const mensajesDAO = new MensajesdaosMongodb()



io.on('connection',async (socket)=>{
  const mensajes = await mensajesDAO.getAll()
  socket.emit('mensaje', mensajes)

  socket.on("nuevoMensaje",async (mensaje) =>{
    mensajesDAO.save(mensaje)
    mensajes.push(mensaje)
    io.sockets.emit('mensaje',mensajes)
    .then(()=>{
        console.log('Registro mensaje Ok!!')
    })
    .catch((err)=>{
        console.log(err)
    })
  })
})


 const PORT= process.env.PORT||8080

 server.listen(PORT,() => {
    console.log(`Server OK!! ${PORT}`);
  });