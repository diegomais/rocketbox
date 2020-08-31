import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { signUpRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.png';
import Background from '~/components/Background';
import {
  Container,
  Image,
  Form,
  FormInput,
  Error,
  SubmitButton,
  SignLink,
  SignLinkText,
  Strong,
} from './styles';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required.'),
  email: Yup.string()
    .email('Enter a valid email.')
    .required('Email is required.'),
  password: Yup.string()
    .min(6, 'Your password must be at least 6 characters long.')
    .required('Password is required.'),
});

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const emailRef = useRef();
  const passwordRef = useRef();

  const initialValues = { name: '', email: '', password: '' };

  function onSubmit(data) {
    const { name, email, password } = data;

    dispatch(signUpRequest(name, email, password));

    navigation.navigate('SignIn');
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
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
                autoCorrect={false}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current.focus()}
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('email')}
              />
              {touched.name && errors.name && <Error>{errors.name}</Error>}
              <FormInput
                icon="mail-outline"
                placeholder="Email address"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                ref={emailRef}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current.focus()}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />
              {touched.email && errors.email && <Error>{errors.email}</Error>}
              <FormInput
                icon="lock-outline"
                placeholder="Password"
                secureTextEntry
                ref={passwordRef}
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
              />
              {touched.password && errors.password && (
                <Error>{errors.password}</Error>
              )}
              <SubmitButton
                loading={loading}
                disabled={!isValid}
                onPress={handleSubmit}
              >
                Sign up
              </SubmitButton>
            </Form>
          )}
        </Formik>
        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>
            Already have an account? <Strong>Log in</Strong>
          </SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
