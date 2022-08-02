import { Router } from "express";
import logger from "../logger/logger.js";

import express from "express";
import {
    registrationControler,loginControler,
    successRegistrerCOntroller,failRegistrerCOntroller,
    successLoginCOntroller,failLoginController,
    logoutController
} from "../controllers/authController.js"

const authRouter = new Router()
const app = express()

app.set("views", "/views")
app.set("view engine","ejs")

authRouter.use(express.json())
authRouter.use(express.urlencoded({extended:false}))


authRouter.post('/registrar', registrationControler)
authRouter.get("/registrar", (req,res)=>{
    res.render("registrar")
})
authRouter.post('/failRegistrer', failRegistrerCOntroller)
authRouter.get('/failRegistrer', (req,res)=>{
    logger.error('Fallo el REGISTRO')
    res.send("fallo el registro")
})
authRouter.post('/registrarSuccess', successRegistrerCOntroller)
authRouter.get('/registrarSuccess', (req,res)=>{
    logger.info(`se registro correctamente`)
    res.render("login")
})


authRouter.post('/login', loginControler)
authRouter.post('/loginFail', failLoginController)
authRouter.get('/loginFail', (req,res)=>{
    logger.error('Fallo el login')
    res.send("fallo login")
})
authRouter.post('/loginSuccess', successLoginCOntroller)
authRouter.get('/loginSuccess', (req,res)=>{
    logger.info(`se Logueo correctamente`)
    res.send("Bienvenid@")
})



authRouter.get('/logout',logoutController)

export default authRouter