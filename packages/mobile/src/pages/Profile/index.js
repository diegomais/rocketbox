import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import Background from '~/components/Background';
// import { Container } from './styles';

export default function Profile() {
  return <Background />;
}

function TabBarIcon({ tintColor }) {
  return <Icon name="person" size={20} color={tintColor} />;
}

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Profile.navigationOptions = {
  tabBarLabel: 'My Profile',
  tabBarIcon: TabBarIcon,
};
