import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/dashboard">
            <img src={logo} alt="Dashboard" />
          </Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Diego Mais</strong>
              <Link to="/profile">My profile</Link>
            </div>
            <button type="button" onClick={handleSignOut}>
              Sign out
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
