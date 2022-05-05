const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//-------------Ruta productos--------------------

const productosRoutes = require('./routes/productos')
app.use("/api/productos",productosRoutes)


//-------------Ruta Carritos--------------------

const carritosRute = require('./routes/carritos')
app.use("/api/carritos",carritosRute)


app.listen(8080,()=>{
    console.log('server Ok',8080)
})