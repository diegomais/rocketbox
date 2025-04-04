import { Document, Model, Schema, model } from 'mongoose'

import { API_URL } from '../config/env'

export interface IFile extends Document {
  title: string
  path: string
  url: string
  createdAt: Date
  updatedAt: Date
}

interface IFileModel extends Model<IFile> {
  url: string
}

const fileSchema = new Schema<IFile>(
  {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

fileSchema.virtual('url').get(function (this: IFile) {
  return `${API_URL}/files/${encodeURIComponent(this.path)}`
})

export default model<IFile, IFileModel>('File', fileSchema)
