const express = require('express')
const  Contenedor = require('./contenedor')
const app = express()



const c = new Contenedor.Contenedor("producos.txt")

app.get("/agregar",async (req,res)=>{
    const producto = {
        title: 'Lapiz',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    }
    const nuevo = await c.save(producto)
    res.send(`Se cargo el producto : ${producto.title}, ID: ${producto.id}`)
})

app.get("/contenedor", async(req,res)=>{
    const todos = await c.getAll()
    res.send( todos)
    console.log(todos)
})


app.get("/random", async(req,res)=>{
    const todos = await c.getAll()
    const random =  Math.floor(Math.random()* todos.length)
    const proRandom = todos[random]

    res.send(proRandom)
    console.log("random", proRandom)

})


let contador = 1
app.get("/visitas",(req,res)=>{
    res.send(`Sitio visitado ${contador++} veces`)
})


const PORT = 8080
app.listen(PORT,()=>{
 console.log("server OK", PORT)
})