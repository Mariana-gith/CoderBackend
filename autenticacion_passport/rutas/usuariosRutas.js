import { Router } from 'express'

import { usuarioController } from '../controllers/controllerUsuario.js'

const usuariosRouter = Router()

usuariosRouter.post('/', usuarioController.post)
usuariosRouter.get('/', usuarioController.get)

export default usuariosRouter