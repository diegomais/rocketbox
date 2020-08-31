import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    // Create a object schema validator and object parser using Yup
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    // Check validity
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid parameters.' });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(401)
          .json({ error: `Sorry, we don't recognize this email.` });
      }

      if (!(await user.checkPassword(password))) {
        return res
          .status(401)
          .json({ error: 'Invalid password. Please try again.' });
      }

      const { id, name } = user;

      return res.json({
        user: { id, name, email },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (err) {
      return res.status(400).json({
        error: 'There was an error on authentication, please try again.',
      });
    }
  }
}

export default new SessionController();
