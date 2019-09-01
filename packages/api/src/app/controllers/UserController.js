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

    try {
      // Check if email already exists in user database
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      // If email already exists in database return error message
      if (userExists) {
        return res.status(400).json({
          error: 'An account already exists with this email address.',
        });
      }

      // Else create user in database
      const { id, name, email, provider } = await User.create(req.body);

      // Then return user information
      return res.json({ id, name, email, provider });
    } catch (err) {
      return res.status(400).json({
        error: 'There was an error creating the user, please try again.',
      });
    }
  }

  async update(req, res) {
    // Create a object schema validator and object parser using Yup
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email('Enter a valid email.'),
      oldPassword: Yup.string()
        .min(6, 'Your password must be at least 6 characters long.')
        .when('password', (password, field) =>
          password ? field.required('Current password is required.') : field
        ),
      password: Yup.string().min(
        6,
        'Your password must be at least 6 characters long.'
      ),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref('password')],
          'Your new password and confirmation password do not match.'
        )
        .when('password', (password, field) =>
          password ? field.required('Confirm new password is required.') : field
        ),
    });

    // Check validity
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid parameters.' });
    }

    try {
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
    } catch (err) {
      return res.status(400).json({
        error: 'There was an error updating the profile, please try again.',
      });
    }
  }
}

export default new UserController();
