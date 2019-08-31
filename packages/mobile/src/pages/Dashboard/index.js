import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays } from 'date-fns';
import { Alert, TouchableWithoutFeedback, FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Card from '~/components/Card';
import { Container, Nav, Title, Text } from './styles';

function Dashboard({ navigation, isFocused }) {
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [meetups, setMeetups] = useState([]);
  const [endOfResults, setEndOfResults] = useState(false);

  const dateFormatted = useMemo(() => format(date, 'EEE, MMM d'), [date]);

  async function handleRegisterSubscription(id) {
    try {
      await api.post(`subscriptions/${id}`);

      navigation.navigate('Subscriptions');
    } catch (err) {
      Alert.alert('Register subscription error', err.response.data.error);
    }
  }

  async function fetchMeetups(day, paginate = 1, prevData = []) {
    const response = await api.get('meetups', {
      params: { date: day, page: paginate },
    });

    setEndOfResults(response.data.length === 0);
    setMeetups(paginate > 1 ? [...prevData, ...response.data] : response.data);
    setPage(paginate + 1);
  }

  function handleFetchMoreMeetups() {
    if (!endOfResults) {
      fetchMeetups(date, page, meetups);
    }
  }

  function handlePrevDay() {
    setDate(subDays(date, 1));
    setPage(1);
    setEndOfResults(false);
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
    setPage(1);
    setEndOfResults(false);
  }

  useEffect(() => {
    if (isFocused) {
      fetchMeetups(date);
    }
  }, [date, isFocused]);

  return (
    <Background>
      <Header />
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
            onEndReached={handleFetchMoreMeetups}
            onEndReachedThreshold={0.2}
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
  isFocused: PropTypes.bool.isRequired,
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

export default withNavigationFocus(Dashboard);
