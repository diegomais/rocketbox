import * as Yup from 'yup';
import { startOfDay, endOfDay, isBefore, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const { date, page = 1 } = req.query;
    const itemsPerPage = 10;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date.' });
    }

    const searchDate = parseISO(date);

    const meetups = await Meetup.findAll({
      where: {
        canceled_at: null,
        date: { [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)] },
      },
      order: ['date'],
      attributes: ['id', 'date', 'title', 'description', 'location'],
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
      include: [
        { model: File, attributes: ['id', 'path', 'url'] },
        { model: User, attributes: ['id', 'name', 'email'] },
      ],
    });

    return res.json(meetups);
  }

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

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      file_id: Yup.number(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date().min(new Date()),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid parameters.' });
    }

    try {
      // Get meetup from db
      const meetup = await Meetup.findByPk(req.params.id);

      // Check authenticated user differ from meetup host
      if (meetup.user_id !== req.userId) {
        return res.status(401).json({
          error: 'You are not allowed to update this meetup.',
        });
      }

      // Check meetup has happened
      if (meetup.past) {
        return res.status(401).json({
          error: 'You are not allowed to update meetup that has happened.',
        });
      }

      await meetup.update(req.body);

      return res.json(meetup);
    } catch (err) {
      return res.status(404).json({
        error: 'Meetup not found.',
      });
    }
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
          error: 'You are not allowed to cancel meetup that has happened.',
        });
      }

      await meetup.destroy();

      return res.json({ message: 'Meetup deleted.' });
    } catch (err) {
      return res.status(404).json({
        error: 'Meetup not found.',
      });
    }
  }
}

export default new MeetupController();
