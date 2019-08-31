import React, { useState, useEffect } from 'react';
import { Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';
import Background from '~/components/Background';
import Card from '~/components/Card';
import { Container, Title } from './styles';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  async function fetchSubscriptions() {
    const response = await api.get('subscriptions');

    setSubscriptions(response.data);
  }

  async function handleCancelSubscriptions(id) {
    await api.delete(`subscriptions/${id}`);

    Alert.alert(
      'Successful cancellation',
      'Your subscription has been successfully canceled.'
    );

    fetchSubscriptions();
  }

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <Background>
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
                  handleCancelSubscriptions(item.id);
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
