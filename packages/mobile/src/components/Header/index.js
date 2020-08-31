import React from 'react';

import logo from '~/assets/logo.png';

import { Container, Image } from './styles';

export default function Header() {
  return (
    <Container>
      <Image source={logo} />
    </Container>
  );
}
