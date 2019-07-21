import Meetup from '../models/Meetup';
import File from '../models/File';

class HostController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const itemsPerPage = 10;

    const meetups = await Meetup.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date', 'title', 'description', 'location'],
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
      include: [
        {
          model: File,
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(meetups);
  }
}

export default new HostController();
