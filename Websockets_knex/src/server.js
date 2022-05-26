
import mysql from "../configs/mysql.js";
import  configsqlite  from "../configs/sqlite.js";
import ContenedoKnex from "../ContenedorKanex.js";

import express from "express";
import http from "http"
const app = express()
const serverHttp = http.createServer(app);
import {Server}  from "socket.io"
import knex from "knex";
const io = new Server(serverHttp);

const productosMysql = new ContenedoKnex("productos", mysql)
const mensajesssqlite = new ContenedoKnex("mensajes", configsqlite)


app.use(express.static('public'))

const productos = []
const mensajes = []

io.on('connection',(socket)=>{
    socket.emit('productos',productos)
    socket.emit('mensaje', mensajes)
    
    socket.on('cargar',producto =>{
        productosMysql.save(producto)
        .then(()=>{
            console.log('Registro producto Ok!!')
        })
        .catch((err)=>{
            console.log(err)
        })
    productos.push(producto)
    io.sockets.emit('productos',productos)
})
socket.on("nuevoMensaje",async (mensaje) =>{
    mensajes.push(mensaje)
    io.sockets.emit('mensaje',mensajes)
    mensajesssqlite.save(mensaje)
    .then(()=>{
        console.log('Registro mensaje Ok!!')
    })
    .catch((err)=>{
        console.log(err)
    })
})
    console.log(productos)
})

//Crear
app.post("/", (req,res)=>{
    let data ={
        nombre:req.body.nombre,
        precio:req.body.precio,
        precio:req.body.precio
       }
       productosMysql.save(data)
        .then((data)=>{
            res.send('Registro producto Ok!!')
    })
    .catch((err)=>{
        res.send(err)
    })
})

app.get("/crear",(req,res)=>{
    res.send("creado")
})



// const mensajes = []

// io.on('connection',(socket)=>{
//     socket.on("nuevoMensaje", mensaje =>{
//         mensaje.fecha = new Date().toLocaleString()
//         mensajes.push(mensaje)
//         io.sockets.emit('mensaje',mensajes)
//     })
// } )



serverHttp.listen(8080,()=>{
    console.log('server OK', 8080)
})