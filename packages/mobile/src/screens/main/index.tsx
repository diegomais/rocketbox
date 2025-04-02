import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as routes from '../../constants/routes';
import * as storage from '../../constants/storage';
import api from '../../services/api';
import s from './styles';

export const MainScreen = () => {
  const { navigate } = useNavigation();
  const [title, setTitle] = useState('');

  useEffect(() => {
    AsyncStorage.getItem(storage.BOX_KEY).then((result) => {
      if (result) {
        navigate(routes.BOX);
      }
    });
  }, []);

  const handleCreateBox = useCallback(async () => {
    const response = await api.post('boxes', { title });

    await AsyncStorage.setItem(storage.BOX_KEY, response.data._id);

    navigate(routes.BOX);
  }, []);

  return (
    <View style={s.container}>
      <Image style={s.logo} source={require('../../../assets/logo.png')} />
      <TextInput
        style={s.input}
        placeholder="New Box Name"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TouchableOpacity onPress={handleCreateBox} style={s.button}>
        <Text style={s.buttonText}>Create New Box</Text>
      </TouchableOpacity>
    </View>
  );
};
