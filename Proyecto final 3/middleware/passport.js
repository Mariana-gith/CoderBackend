import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from 'bcrypt'

import {obtenerPorNombre} from "../data/dataBaseUsuario.js"

import { registrarUsuario } from "../api/usuarioApi.js";
import { autenticar } from "../api/authApi.js";

passport.use('registro', new Strategy({
    passReqToCallback:true
},
    async (req,username,password,done) =>{
        try {
            const datosUsuario = req.body
            datosUsuario.password = bcrypt.hashSync(datosUsuario.password, process.env.HASH_SALT)
            const usuario = await registrarUsuario(datosUsuario)
            done(null,usuario)
        } catch (error) {
            return done(error)
        }
    }
))

passport.use('login', new Strategy(
    async (username,password,done) => {
        try {
            const passwordHash = bcrypt.hashSync(password, process.env.HASH_SALT) 
            const usuario = await autenticar(username, passwordHash)
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
    obtenerPorNombre(username).then((user) => {done(null,user)})    
})


export const passportSession = passport.session()