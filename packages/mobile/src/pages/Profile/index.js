import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';
import Background from '~/components/Background';
import Header from '~/components/Header';
import {
  Container,
  Title,
  Form,
  FormInput,
  Error,
  SubmitButton,
  SignOutButton,
  Separator,
} from './styles';

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email('Enter a valid email.'),
  oldPassword: Yup.string()
    .min(6, 'Your current password must be at least 6 characters long.')
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

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const initialValues = {
    name: profile.name || '',
    email: profile.email || '',
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  function onSubmit(data) {
    const { name, email, oldPassword, password, confirmPassword } = data;

    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Header />
      <Container>
        <Title>My profile</Title>
        <Formik
          initialValues={initialValues}
          onSubmit={values => onSubmit(values)}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <Form>
              <FormInput
                icon="person-outline"
                placeholder="Full name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
                autoCorrect={false}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current.focus()}
              />
              {touched.name && errors.name && <Error>{errors.name}</Error>}
              <FormInput
                icon="mail-outline"
                placeholder="Email address"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                ref={emailRef}
                returnKeyType="next"
                onSubmitEditing={() => oldPasswordRef.current.focus()}
              />
              {touched.email && errors.email && <Error>{errors.email}</Error>}
              <Separator />
              <FormInput
                icon="lock-outline"
                placeholder="Current password"
                value={values.oldPassword}
                onChangeText={handleChange('oldPassword')}
                onBlur={() => setFieldTouched('oldPassword')}
                secureTextEntry
                ref={oldPasswordRef}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
              />
              {touched.oldPassword && errors.oldPassword && (
                <Error>{errors.oldPassword}</Error>
              )}
              <FormInput
                icon="lock-outline"
                placeholder="New password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                secureTextEntry
                ref={passwordRef}
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordRef.current.focus()}
              />
              {touched.password && errors.password && (
                <Error>{errors.password}</Error>
              )}
              <FormInput
                icon="lock-outline"
                placeholder="Confirm new password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')}
                secureTextEntry
                ref={confirmPasswordRef}
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Error>{errors.confirmPassword}</Error>
              )}
              <SubmitButton disabled={!isValid} onPress={handleSubmit}>
                Update profile
              </SubmitButton>
              <SignOutButton onPress={handleSignOut}>Sign out</SignOutButton>
            </Form>
          )}
        </Formik>
      </Container>
    </Background>
  );
}

function TabBarIcon({ tintColor }) {
  return <Icon name="person" size={20} color={tintColor} />;
}

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Profile.navigationOptions = {
  tabBarLabel: 'My Profile',
  tabBarIcon: TabBarIcon,
};
