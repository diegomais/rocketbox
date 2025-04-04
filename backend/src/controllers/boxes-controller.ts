import { Request, Response } from 'express'

import Box from '../models/box'

class BoxController {
  async store(req: Request, res: Response): Promise<Response> {
    const box = await Box.create(req.body) // or { title: req.body.title }

    return res.json(box)
  }

  async show(req: Request, res: Response): Promise<Response> {
    const box = await Box.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } },
    })

    return res.json(box)
  }
}

export default new BoxController()
