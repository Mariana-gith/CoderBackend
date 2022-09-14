import passport from "passport";

export const registrationControler = passport.authenticate('registro',{
    failureRedirect:'/failRegistrer',
    successRedirect: '/registrarSuccess'
}) 

export const loginControler = passport.authenticate('login',{
    failureRedirect:'/loginFail',
    successRedirect: '/loginSuccess'
}) 

export const successRegistrerCOntroller = (req,res) =>{
    // ACA ESTOY MANEJANDO EL REGISTRO CORRECTO
    // CREO UN CARRITO PARA EL NUEVO USUARIO
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