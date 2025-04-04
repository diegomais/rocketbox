import { Document, Schema, model } from 'mongoose'

export interface IBox extends Document {
  title: string
  files: Schema.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const boxSchema = new Schema<IBox>(
  {
    title: {
      type: String,
      required: true,
    },
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
  },
  {
    timestamps: true,
  }
)

export default model<IBox>('Box', boxSchema)
