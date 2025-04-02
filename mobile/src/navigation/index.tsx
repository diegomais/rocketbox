import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import * as routes from '../constants/routes';
import { BoxScreen } from '../screens/box';
import { MainScreen } from '../screens/main';

const Stack = createStackNavigator();

export const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName={routes.MAIN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={routes.MAIN} component={MainScreen} />
      <Stack.Screen name={routes.BOX} component={BoxScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
