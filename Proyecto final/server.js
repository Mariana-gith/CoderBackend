import express from "express"


import {session } from './middleware/session.js'
import { passportMiddleware, passportSession } from './middleware/passport.js'


import usuariosRouter from "./rutas/usuariosRutas.js"
import authRutas from "./rutas/authRutas.js"
import datosRouter from "./rutas/datosRutas.js"
import infoRutas from "./rutas/infoRutas.js"
import productosRuta from "./rutas/productosRuta.js"
import carritoRuta from "./rutas/carritosRutas.js"
import orderRutas from "./rutas/orderRutas.js"


import logger from "./logger/logger.js"
const app = express()

app.use(express.json())
app.use(session)
app.use(passportMiddleware)
app.use(passportSession)
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))


app.use("/",authRutas)
app.use("/api/usuarios",usuariosRouter)
app.use("/datos",datosRouter)
app.use("/info",infoRutas)
app.use("/api/products",productosRuta)
app.use("/api/shoppingcartproducts",carritoRuta)
app.use("/api/orders",orderRutas)


app.set("views", "./views")
app.set("view engine","ejs")

    
const PORT= process.env.PORT||8080

 app.listen(PORT,() => {
    logger.info(`Server OK!! ${PORT}`);
  });