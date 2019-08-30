import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Banner,
  Info,
  Title,
  Row,
  RowIcon,
  Text,
  ActionButton,
} from './styles';

export default function Card({
  banner,
  title,
  date,
  location,
  host,
  actionText,
  actionFunction,
}) {
  return (
    <Container>
      <Banner source={banner} />
      <Info>
        <Title>{title}</Title>
        <Row>
          <RowIcon name="event" />
          <Text>{date}</Text>
        </Row>
        <Row>
          <RowIcon name="location-on" />
          <Text>{location}</Text>
        </Row>
        <Row>
          <RowIcon name="person" />
          <Text>{host}</Text>
        </Row>
        <ActionButton onPress={actionFunction}>{actionText}</ActionButton>
      </Info>
    </Container>
  );
}

Card.propTypes = {
  banner: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  actionFunction: PropTypes.func.isRequired,
};
