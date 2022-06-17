import express from "express"


import session from './middleware/session.js'

import usuariosRouter from "./rutas/usuariosRutas.js"
import authRutas from "./rutas/authRutas.js"
import datosRouter from "./rutas/datosRutas.js"

const app = express()

app.use(express.json())
app.use(session)

app.use("/",usuariosRouter)
app.use("/",authRutas)
app.use("/",datosRouter)






app.listen(3030,()=>{
    console.log("server OK!",3030)
})

