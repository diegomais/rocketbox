import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './navigation';

const App = () => (
  <SafeAreaProvider>
    <Navigation />
    <StatusBar />
  </SafeAreaProvider>
);

registerRootComponent(App);
