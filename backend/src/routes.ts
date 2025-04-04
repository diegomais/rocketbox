import { Router } from 'express'
import multer from 'multer'

import multerConfig from './config/multer'

import BoxController from './controllers/boxes-controller'
import FileController from './controllers/files-controller'

const routes = Router()

routes.post('/boxes', BoxController.store)

routes.get('/boxes/:id', BoxController.show)

routes.post(
  '/boxes/:id/files',
  multer(multerConfig).single('file'),
  FileController.store
)

export default routes
