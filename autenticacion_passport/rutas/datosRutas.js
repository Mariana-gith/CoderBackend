import { Router } from 'express'
import datosController from '../controllers/datosController.js'

const datosRouter = new Router()

datosRouter.get('/datos', datosController.get)

export default datosRouter