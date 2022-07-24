export const autenticacion = (req,res,next) =>{
    if (req.isAuthenticated()) {
        console.log(req.user)
        next()
    } else {
        res.status(401)
    }
}