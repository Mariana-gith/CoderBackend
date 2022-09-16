import { Router } from 'express'
import express from 'express'
import compression from 'compression'
import {mostrarArg,
    mostrarPid,
    mostrarPlataf,
        mostrarCarpeta,
        mostrarVersion} from '../controllers/infoController.js'




const infoRutas = new Router()
infoRutas.use(express.static('public'))
const app = express()

app.set("views", "./views")
app.set("view engine","ejs")

app.get("/info",compression(),(req,res)=>{
    res.render("info",{
        mostrarArg,
        mostrarPid,
        mostrarPlataf,
        mostrarCarpeta,
        mostrarVersion
    })
})



// app.listen(8082,()=>{
//     console.log("server ok",8082)
// })



export default infoRutas