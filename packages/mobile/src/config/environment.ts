import { releaseChannel } from 'expo-updates';

const ENV = {
  dev: {
    envName: 'DEVELOPMENT',
    baseURL: 'http://localhost:3333',
  },
  prod: {
    envName: 'PRODUCTION',
    baseURL: 'https://rocket-box.herokuapp.com',
  },
};

export const getEnvironment = () => {
  if (releaseChannel === 'default') {
    // In development in Expo Go, releaseChannel is always 'default'.
    return ENV.dev;
  } else {
    return ENV.prod;
  }
};
