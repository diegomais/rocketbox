export type File = {
  _id: string;
  createdAt: string;
  id: string;
  path: string;
  title: string;
  updatedAt: string;
  url: string;
};

export type Box = {
  _id: string;
  createdAt: string;
  files: File[];
  title: string;
  updatedAt: string;
};
