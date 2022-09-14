export const autenticacion = (req,res,next) =>{
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401)
    }
}

// VERIFICADOR DE ADMINS
export const autorizacionAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin' ) {
        next()
    } else {
        res.status(401).send('POR ACA NO PASAS SIN PERMISO!');
    }
}