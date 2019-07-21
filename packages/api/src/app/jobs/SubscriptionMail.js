import { format, parseISO } from 'date-fns';

import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    // Email to host
    await Mail.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: 'New subscription for meetup',
      template: 'subscription',
      context: {
        host: meetup.User.name,
        member: user.name,
        email: user.email,
        title: meetup.title,
        description: meetup.description,
        location: meetup.description,
        date: format(parseISO(meetup.date), "dd.MM.yy' at 'HH:mm"),
      },
    });
  }
}

export default new SubscriptionMail();
