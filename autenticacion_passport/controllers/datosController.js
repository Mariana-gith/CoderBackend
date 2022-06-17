const datosController = {
    get: (req, res) => {
        res.json({ msj: req.session.mensaje })
    }
}

export default datosController