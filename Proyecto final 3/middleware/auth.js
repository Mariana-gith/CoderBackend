export const autenticacion = (req,res,next) =>{
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401)
    }
}