import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

import {faker} from "@faker-js/faker"

const app = express()
const advancedOptions= {useNewUrlParser:true,useUnifiedTopology:true}

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.set("views", "./views")
app.set("view engine","ejs")

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
    
    
    app.get("/home",(req,res)=>{
        if( req.session.admin===true){
            let username = req.session.nombre
            res.render("home",{bienvenid:username})
        }else{
            let username = req.session.nombre
            res.render("home",{bienvenid:"Invitad@"})
        }
    })
    
    app.get("/login",(req,res)=>{
        res.render("login")
        let user = req.session.nombre

    })
    
    app.post("/login",(req,res)=>{
        let username = req.body.nombre
        if(username !=="Mariana"){
            return res.send("Fallo login")
        }
        req.session.nombre= username
        req.session.admin = true
        console.log("admin?", req.session.admin)
        res.render("home",{bienvenid:username})
    })

    app.get("/saliendo", (req,res)=>{
        let username = req.session.nombre
        res.render("saliendo",{bienvenid:username})
    })

    app.get("/logout",(req,res)=>{
        setTimeout(()=>{
            req.session.destroy((err)=>{
                if(err){
                    console.log("Error",err)
                }
                else{
                    res.redirect("login")
                }
            })
        },3000)
    })



let arrayPersonas = []
app.get("/productos-test",(req,res)=>{
    if( req.session.admin===true){
        for( let i=0 ; i< 5; i++){
            if(arrayPersonas.length=== 5){
                arrayPersonas=[]
            }
                arrayPersonas.push({
                    nombre: faker.commerce.productName(),
                    precio:faker.commerce.price(),
                    foto:faker.image.technics(),
                    id:i+1           
                })
        }   
        let username = req.session.nombre
        res.render("tabla", {data:arrayPersonas,bienvenid:username})
    }else{
        res.send("No puedes acceder a esta vista ")
    }
})

app.listen(8080, ()=>{
    console.log("server OK!! ", 8080)
})

