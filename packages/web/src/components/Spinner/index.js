import React from 'react';

import spinner from '~/assets/curve-bars-loading-indicator.svg';

import { Container } from './styles';

export default function Spinner() {
  return (
    <Container>
      <img src={spinner} alt="Loading..." />
    </Container>
  );
}
