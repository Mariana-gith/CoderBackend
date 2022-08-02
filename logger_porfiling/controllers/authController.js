import passport from "passport";

import logger from "../logger/logger.js";


export const registrationControler = passport.authenticate('registro',{
    failureRedirect:'/auth/failRegistrer',
    successRedirect: '/auth/registrarSuccess'
}) 

export const loginControler = passport.authenticate('login',{
    failureRedirect:'/auth/loginFail',
    successRedirect: '/auth/loginSuccess'
}) 

export const successRegistrerCOntroller = (req,res) =>{
    res.json({msj: "OK"})
}

export const failRegistrerCOntroller = (req,res) =>{
    res.json({err:'Fallo el REGISTRO'})
}

export const successLoginCOntroller = (req,res) =>{
    res.json({msj: "OK"})
}

export const failLoginController = (req,res) =>{
    res.json({err:'Fallo el LOGIN'})

}

export const logoutController = (req,res) =>{
    if(req.isAuthenticated()){
        req.logOut()
    }
    res.sendStatus(200)

}