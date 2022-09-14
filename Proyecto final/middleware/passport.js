import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from 'bcrypt'

import {obtenerPorNombre} from "../data/dataBaseUsuario.js"
import {carroNuevo} from "../data/dataBaseCarrito.js"

import { registrarUsuario } from "../api/usuarioApi.js";
import { autenticar } from "../api/authApi.js";

passport.use('registro', new Strategy({
    passReqToCallback:true
},
    async (req,username,password,done) =>{
        try {
            if(username === process.env.ADMIN_USER ){
                throw new Error("Usuario invalido")
            } else{
                const datosUsuario = req.body
                datosUsuario.password = bcrypt.hashSync(datosUsuario.password, process.env.HASH_SALT)
                const usuario = await registrarUsuario(datosUsuario)
                await carroNuevo({productos: [], usuario: usuario.username})
                done(null,usuario)
            }
        } catch (error) {
            return done(error)
        }
    }
))

passport.use('login', new Strategy(
    async (username,password,done) => {
        try {
            let usuario;
            if(username === process.env.ADMIN_USER && password === process.env.ADMIN_USER){
                usuario = {
                    username, password, role: 'admin'
                }
            } else {
                const passwordHash = bcrypt.hashSync(password, process.env.HASH_SALT) 
                usuario = await autenticar(username, passwordHash)
            }
            done(null,usuario) 
        } catch (error) {
            done(null,false)
        }
    }
))

export const passportMiddleware = passport.initialize()

passport.serializeUser((user,done) => {
    done(null, user.username)
})

passport.deserializeUser((username,done) => {
    if(username === process.env.ADMIN_USER  ){
        const user = {
            username, password: process.env.ADMIN_USER, role: 'admin'
        }
        done(null,user)
    }
    else{
        obtenerPorNombre(username).then((user) => {done(null,user)})    
    }
})


export const passportSession = passport.session()