import express from "express"

import {session } from './middleware/session.js'
import { passportMiddleware, passportSession } from './middleware/passport.js'


import usuariosRouter from "./rutas/usuariosRutas.js"
import authRutas from "./rutas/authRutas.js"
import datosRouter from "./rutas/datosRutas.js"
import infoRutas from "./rutas/infoRutas.js"

const app = express()

app.use(express.json())
app.use(session)
app.use(passportMiddleware)
app.use(passportSession)



app.use("/auth",authRutas)
app.use("/api/usuarios",usuariosRouter)
app.use("/datos",datosRouter)
app.use("/info",infoRutas)


app.set("views", "./views")
app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:false}))







app.listen(8080,()=>{
    console.log("server OK!",8080)
})