import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

import logo from '~/assets/logo.svg';

export default function SignUp() {
  return (
    <>
      <img src={logo} alt="Meetapp" />

      <form>
        <input placeholder="Full Name" />
        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign up</button>
        <span>
          Already have an account? &nbsp;&nbsp;<Link to="/">Login in</Link>
        </span>
      </form>
    </>
  );
}
