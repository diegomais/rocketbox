import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

import logo from '~/assets/logo.svg';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="Meetapp" />

      <form>
        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />
        <button type="submit">Log in</button>
        <span>
          Don’t have an account? &nbsp;&nbsp;<Link to="/register">Sign up</Link>
        </span>
      </form>
    </>
  );
}
