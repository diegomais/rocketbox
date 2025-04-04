import { Request, Response } from 'express'

import type { MulterFile } from '../config/multer'
import Box from '../models/box'
import File from '../models/file'

class FileController {
  async store(req: Request, res: Response): Promise<Response> {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const box = await Box.findById(req.params.id)

    if (!box) {
      return res.status(404).json({ error: 'Box not found' })
    }

    const multerFile = req.file as MulterFile

    const file = await File.create({
      title: multerFile.originalname,
      path: multerFile.key,
    })

    box.files.push(file._id)

    await box.save()

    req.io.sockets.in(box._id.toString()).emit('file', file)

    return res.json(file)
  }
}

export default new FileController()
