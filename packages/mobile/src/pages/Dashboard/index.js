import React, { useState, useMemo } from 'react';
import { format, subDays, addDays } from 'date-fns';
import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import Background from '~/components/Background';
import { Container, Nav, Title } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(() => format(date, 'EEE, MMM d'), [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Background>
      <Container>
        <Nav>
          <TouchableWithoutFeedback onPress={handlePrevDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableWithoutFeedback>
          <Title>{dateFormatted}</Title>
          <TouchableWithoutFeedback onPress={handleNextDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableWithoutFeedback>
        </Nav>
      </Container>
    </Background>
  );
}

function TabBarIcon({ tintColor }) {
  return <Icon name="format-list-bulleted" size={20} color={tintColor} />;
}

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: TabBarIcon,
};
