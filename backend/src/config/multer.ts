import { Request } from 'express'
import multer from 'multer'
import crypto from 'node:crypto'
import path from 'node:path'

export interface MulterFile extends Express.Multer.File {
  key: string
}

const multerConfig: multer.Options = {
  dest: path.resolve(__dirname, '..', '..', 'temp'),
  storage: multer.diskStorage({
    destination: (
      _req: Request,
      _file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) => {
      cb(null, path.resolve(__dirname, '..', '..', 'temp'))
    },
    filename: (
      _req: Request,
      file: MulterFile,
      cb: (error: Error | null, filename: string) => void
    ) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, '')

        file.key = `${hash.toString('hex')}-${file.originalname}`

        cb(null, file.key)
      })
    },
  }),
}

export default multerConfig
