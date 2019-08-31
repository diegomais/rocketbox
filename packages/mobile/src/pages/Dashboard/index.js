import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays } from 'date-fns';
import { Alert, TouchableWithoutFeedback, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';
import Background from '~/components/Background';
import Card from '~/components/Card';
import { Container, Nav, Title, Text } from './styles';

export default function Dashboard({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);

  const dateFormatted = useMemo(() => format(date, 'EEE, MMM d'), [date]);

  async function handleRegisterSubscription(id) {
    try {
      await api.post(`subscriptions/${id}`);

      navigation.navigate('Subscriptions');
    } catch (err) {
      Alert.alert('Register subscription error', err.response.data.error);
    }
  }

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', { params: { date } });

      setMeetups(response.data);
    }

    loadMeetups();
  }, [date]);

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

        {meetups.length ? (
          <FlatList
            data={meetups}
            extraData={date}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Card
                banner={item.banner}
                title={item.title}
                date={item.date}
                location={item.location}
                host={item.host.name}
                actionText="Register subscription"
                actionFunction={() => {
                  handleRegisterSubscription(item.id);
                }}
              />
            )}
          />
        ) : (
          <Text>No meetups found.</Text>
        )}
      </Container>
    </Background>
  );
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

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
