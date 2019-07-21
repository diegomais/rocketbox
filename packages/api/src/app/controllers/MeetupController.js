import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';

class MeetupController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      file_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid parameters.' });
    }

    // Check for past date
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({
        error: 'Date must not be in the past. Please, check and try again.',
      });
    }

    const meetup = await Meetup.create({ user_id: req.userId, ...req.body });

    return res.json(meetup);
  }

  async delete(req, res) {
    try {
      // Get meetup from db
      const meetup = await Meetup.findByPk(req.params.id);

      // Check authenticated user differ from meetup host
      if (meetup.user_id !== req.userId) {
        return res.status(401).json({
          error: 'You are not allowed to cancel this meetup.',
        });
      }

      // Check meetup has happened
      if (meetup.past) {
        return res.status(401).json({
          error: 'You are not allowed to cancel previous meetup.',
        });
      }

      await meetup.destroy();

      return res.json({ message: 'Meetup deleted.' });
    } catch (err) {
      return res.status(401).json({
        error: 'Meetup not found.',
      });
    }
  }
}

export default new MeetupController();
