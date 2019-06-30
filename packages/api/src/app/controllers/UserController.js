import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    // Create a object schema validator and object parser using Yup
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    // Check validity
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid parameters.' });
    }

    // Check if email already exists in user database
    const userExists = await User.findOne({ where: { email: req.body.email } });

    // If email already exists in database return error message
    if (userExists) {
      return res
        .status(400)
        .json({ error: 'An account already exists with this email address.' });
    }

    // Else create user in database
    const { id, name, email, provider } = await User.create(req.body);

    // Then return user information
    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    // Create a object schema validator and object parser using Yup
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string()
        .min(6)
        .when('password', (password, field) =>
          password ? field.required() : field
        ),
      password: Yup.string().min(6),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')])
        .when('password', (password, field) =>
          password ? field.required() : field
        ),
    });

    // Check validity
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid parameters.' });
    }
    const user = await User.findByPk(req.userId);

    const { email, oldPassword } = req.body;

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({
          error: 'An account already exists with this email address.',
        });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({
        error: 'Invalid password. Please try again.',
      });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, email, provider });
  }
}

export default new UserController();
