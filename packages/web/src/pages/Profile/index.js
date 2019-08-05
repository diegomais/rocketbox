import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email('Enter a valid email.'),
  oldPassword: Yup.string()
    .min(6, 'Your password must be at least 6 characters long.')
    .when('password', (password, field) =>
      password ? field.required() : field
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
      password ? field.required() : field
    ),
});

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Full name" />
        <Input name="email" type="email" placeholder="Email address" />
        <hr />
        <Input
          name="oldPassword"
          type="password"
          placeholder="Current password"
        />
        <Input name="password" type="password" placeholder="New password" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm new password"
        />
        <button type="submit">Update profile</button>
      </Form>
    </Container>
  );
}
