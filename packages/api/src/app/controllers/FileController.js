import File from '../models/File';

class FileController {
  async store(req, res) {
    try {
      const { originalname: name, filename: path } = req.file;

      const file = await File.create({ name, path });

      return res.json(file);
    } catch (err) {
      return res.status(400).json({
        error: 'There was an error uploading the file, try again.',
      });
    }
  }
}
export default new FileController();
