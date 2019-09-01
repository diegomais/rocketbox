import { Op } from 'sequelize';

import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class SubscriptionController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const itemsPerPage = 10;

    try {
      const subscriptions = await Subscription.findAll({
        where: { user_id: req.userId },
        include: [
          {
            model: Meetup,
            as: 'meetup',
            where: { date: { [Op.gt]: new Date() } },
            include: [
              { model: File, as: 'banner', attributes: ['id', 'path', 'url'] },
              { model: User, as: 'host', attributes: ['id', 'name', 'email'] },
            ],
          },
        ],
        order: [['meetup', 'date']],
        limit: itemsPerPage,
        offset: (page - 1) * itemsPerPage,
      });

      return res.json(subscriptions);
    } catch (err) {
      return res.status(404).json({
        error: 'Subscriptions not found.',
      });
    }
  }

  async store(req, res) {
    try {
      const { id } = req.params;

      // Get meetup from db
      const meetup = await Meetup.findByPk(id, {
        include: [
          { model: User, as: 'host', attributes: ['id', 'name', 'email'] },
        ],
      });

      // Check authenticated user differ from meetup host
      if (meetup.user_id === req.userId) {
        return res.status(401).json({
          error: 'You cannot subscribe for your own meetup.',
        });
      }

      // Check meetup has happened
      if (meetup.past) {
        return res.status(401).json({
          error: 'You cannot subscribe for meetup that has happened.',
        });
      }

      // Check user has subscribe before
      const checkUserHasSubscribedBefore = await Subscription.findOne({
        where: { meetup_id: id, user_id: req.userId },
      });
      if (checkUserHasSubscribedBefore) {
        return res
          .status(401)
          .json({ error: 'You cannot subscribe twice for the same meetup.' });
      }

      // Check user has subscribe before
      const checkUserIsBusy = await Subscription.findOne({
        where: { user_id: req.userId },
        include: [
          { model: Meetup, as: 'meetup', where: { date: meetup.date } },
        ],
      });
      if (checkUserIsBusy) {
        return res.status(401).json({
          error: 'You cannot subscribe for two meetups at the same time.',
        });
      }

      // Subscribe for meetup
      const subscription = await Subscription.create({
        meetup_id: id,
        user_id: req.userId,
      });

      // Add job to email host with user data
      const user = await User.findOne({
        where: { id: req.userId },
        attributes: ['id', 'name', 'email'],
      });

      await Queue.add(SubscriptionMail.key, { meetup, user });

      return res.json(subscription);
    } catch (err) {
      return res.status(404).json({
        error: 'Meetup not found.',
      });
    }
  }

  async delete(req, res) {
    try {
      // Get subscription from db
      const subscription = await Subscription.findByPk(req.params.id, {
        include: [{ model: Meetup, as: 'meetup', attributes: ['id', 'past'] }],
      });

      // Check authenticated user differ from subscription user
      if (subscription.user_id !== req.userId) {
        return res.status(401).json({
          error: 'You are not allowed to cancel this subscription.',
        });
      }

      await subscription.destroy();

      return res.json({ message: 'Subscription canceled.' });
    } catch (err) {
      return res.status(404).json({
        error: 'Subscription not found.',
      });
    }
  }
}
export default new SubscriptionController();
