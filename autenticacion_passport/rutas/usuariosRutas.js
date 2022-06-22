import { Router } from 'express'

import { getUsuarios } from '../controllers/controllerUsuario.js'

const usuariosRouter = new Router()

usuariosRouter.get("/",getUsuarios)

export default  usuariosRouter