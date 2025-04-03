export type FileType = {
  _id: string
  createdAt: string
  title: string
  url: string
}

export type BoxType = {
  _id: string
  files: FileType[]
  title: string
}
