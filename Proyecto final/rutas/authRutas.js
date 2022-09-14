import { Router } from "express";
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
    res.send("fallo el registro")
})
authRouter.post('/registrarSuccess', successRegistrerCOntroller)
authRouter.get('/registrarSuccess', (req,res)=>{
    res.render("login")
})
authRouter.get('/', (req,res)=>{
    res.render("login")
})


authRouter.post('/login', loginControler)
authRouter.post('/loginFail', failLoginController)
authRouter.get('/loginFail', (req,res)=>{
    res.send("fallo login")
})
authRouter.post('/loginSuccess', successLoginCOntroller)
authRouter.get('/loginSuccess', (req,res)=>{
    res.render("home")
})



authRouter.get('/logout',logoutController)

export default authRouter