import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useMemo } from 'react';
import { BOX_SCREEN, MAIN_SCREEN } from './constants/routes';
import { STORAGE_KEY } from './constants/storage';
import BoxScreen from './screens/Box';
import MainScreen from './screens/Main';

const Stack = createStackNavigator();

export default function Routes() {
  const boxId = '60212bfc3f2f840017b15f3c';
  // const boxId = useMemo(
  //   async () => await AsyncStorage.getItem(STORAGE_KEY),
  //   []
  // );

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={boxId ? BOX_SCREEN : MAIN_SCREEN}
    >
      <Stack.Screen name={MAIN_SCREEN} component={MainScreen} />
      <Stack.Screen
        name={BOX_SCREEN}
        component={BoxScreen}
        initialParams={{ boxId }}
      />
    </Stack.Navigator>
  );
}
