import { Op } from 'sequelize';

import Mail from '../../lib/Mail';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';

class SubscriptionController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const itemsPerPage = 10;

    const subscriptions = await Subscription.findAll({
      where: { user_id: req.userId },
      include: [{ model: Meetup, where: { date: { [Op.gt]: new Date() } } }],
      order: [[Meetup, 'date']],
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    try {
      const { id } = req.params;

      // Get meetup from db
      const meetup = await Meetup.findByPk(id);

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
        include: [{ model: Meetup, where: { date: meetup.date } }],
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

      // Send email to host with user data
      const user = await User.findOne({
        where: { id: req.userId },
        attributes: ['id', 'name', 'email'],
      });

      await Mail.sendMail({
        to: `${user.name} <${user.email}>`,
        subject: 'New subscription for meetup',
        text: 'You have a new subscription.',
      });

      return res.json(subscription);
    } catch (error) {
      return res.status(404).json({
        error: 'Meetup not found.',
      });
    }
  }
}
export default new SubscriptionController();
