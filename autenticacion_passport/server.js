import express from "express"

import {session } from './middleware/session.js'
import { passportMiddleware, passportSession } from './middleware/passport.js'


import usuariosRouter from "./rutas/usuariosRutas.js"
import authRutas from "./rutas/authRutas.js"
import datosRouter from "./rutas/datosRutas.js"

const app = express()

app.use(express.json())
app.use(session)
app.use(passportMiddleware)
app.use(passportSession)



app.use("/auth",authRutas)
app.use("/api/usuarios",usuariosRouter)
app.use("/datos",datosRouter)

app.set("views", "./views")
app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:false}))


// app.get("/",(req,res)=>{
   
// })



app.listen(3030,()=>{
    console.log("server OK!",3030)
})

