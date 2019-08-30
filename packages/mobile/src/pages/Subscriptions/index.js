import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';
import Background from '~/components/Background';
import Card from '~/components/Card';
import { Container } from './styles';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    async function loadSubscriptions() {
      const response = await api.get('subscriptions');

      setSubscriptions(response.data);
    }

    loadSubscriptions();
  }, []);

  return (
    <Background>
      <Container>
        {subscriptions.length > 0 && (
          <FlatList
            data={subscriptions}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => {
              return (
                <Card
                  banner={item.meetup.banner}
                  title={item.meetup.title}
                  date={item.meetup.date}
                  location={item.meetup.location}
                  host={item.meetup.host.name}
                  actionText="Cancel"
                  actionFunction={() => {}}
                />
              );
            }}
          />
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
