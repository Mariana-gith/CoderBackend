import { Router } from 'express'

import datosController from '../controllers/datosController.js'
import { autenticacion } from '../middleware/auth.js'


const datosRouter = new Router()

datosRouter.get(('/', datosController, autenticacion))

export default datosRouter