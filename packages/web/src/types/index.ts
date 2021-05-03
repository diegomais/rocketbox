export type File = {
  _id: string;
  createdAt: string;
  title: string;
  url: string;
};

export type Box = {
  _id: string;
  files: File[];
  title: string;
};
