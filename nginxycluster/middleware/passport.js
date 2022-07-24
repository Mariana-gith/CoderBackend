import passport from "passport";
import { Strategy } from "passport-local";

import {obtenerPorId} from "../data/dataBaseUsuario.js"

import { registrarUsuario } from "../api/usuarioApi.js";
import { autenticar } from "../api/authApi.js";

passport.use('registro', new Strategy({
    passReqToCallback:true,
    // passwordField:"password",
    // usernameField:"email"
},
    (req,username,password,done) =>{
        try {
            const datosUsuario = req.body
            const usuario = registrarUsuario(datosUsuario)
            done(null,usuario)
        } catch (error) {
            return done(error)
        }
    }
))

passport.use('login', new Strategy(
    (username,password,done) => {
        try {
           const usuario = autenticar(username,password)
           done(null,usuario) 
        } catch (error) {
            done(null,false)
        }

    }
))

export const passportMiddleware = passport.initialize()

passport.serializeUser((user,done) => {
    done(null, user.id)
})

passport.deserializeUser((id,done) => {
    const user = obtenerPorId(id)
    done(null,user)
})


export const passportSession = passport.session()