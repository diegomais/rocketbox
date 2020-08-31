import React, { useState, useEffect } from 'react';
import { Alert, FlatList } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Card from '~/components/Card';
import { Container, Title } from './styles';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);

  async function fetchSubscriptions() {
    const response = await api.get('subscriptions');

    setSubscriptions(response.data);
  }

  async function handleCancelSubscription(id) {
    try {
      await api.delete(`subscriptions/${id}`);

      Alert.alert(
        'Successful cancellation',
        'Your subscription has been successfully canceled.'
      );

      fetchSubscriptions();
    } catch (err) {
      Alert.alert('Cancel subscription error', err.response.data.error);
    }
  }

  useEffect(() => {
    if (isFocused) {
      fetchSubscriptions();
    }
  }, [isFocused]);

  return (
    <Background>
      <Header />
      <Container>
        {subscriptions.length ? (
          <FlatList
            data={subscriptions}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Card
                banner={item.meetup.banner}
                title={item.meetup.title}
                date={item.meetup.date}
                location={item.meetup.location}
                host={item.meetup.host.name}
                actionText="Cancel subscription"
                actionFunction={() => {
                  handleCancelSubscription(item.id);
                }}
              />
            )}
          />
        ) : (
          <Title>No subscriptions found.</Title>
        )}
      </Container>
    </Background>
  );
}

function TabBarIcon({ tintColor }) {
  return <Icon name="local-offer" size={20} color={tintColor} />;
}

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Subscriptions.navigationOptions = {
  tabBarLabel: 'Subscriptions',
  tabBarIcon: TabBarIcon,
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
