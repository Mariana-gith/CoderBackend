import { Router } from 'express'
import {mostrarArg,
        mostrarPid,
        mostrarPlataf,
        mostrarCarpeta,
        mostrarVersion} from '../controllers/infoController.js'


const infoRutas = new Router()

infoRutas.get("/",(req,res)=>{
    res.render("info",{
        mostrarArg,
        mostrarPid,
        mostrarPlataf,
        mostrarCarpeta,
        mostrarVersion
    })
})


export default infoRutas