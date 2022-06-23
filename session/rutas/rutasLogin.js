import express, { request } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express()
const { Router } = express
const rutasLogin = new Router()

app.set("views", "./views")
app.set("view engine","ejs")


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(
    session({
        store: MongoStore.create({
            mongoUrl:'mongodb+srv://mariana:mariana@cluster1.9z6uk.mongodb.net/sesiones?retryWrites=true&w=majority',
            mongoOptions: advancedOptions
        }),
        secret:"secreto",
        resave: false,
        saveUninitialized:false                
    }))
    
    
    rutasLogin.get("/",(req,res)=>{
    })