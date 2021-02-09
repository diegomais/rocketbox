import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BOX_SCREEN } from '../../constants/routes';
import { STORAGE_KEY } from '../../constants/storage';
import api from '../../services/api';
import { Box } from '../../types';
import styles from './styles';

export default function MainScreen() {
  const [title, setTitle] = useState('');
  const { navigate } = useNavigation();

  const handleCreateBox = useCallback(async () => {
    const { data } = await api.post<Box>('boxes', { title });

    await AsyncStorage.setItem(STORAGE_KEY, data._id);

    navigate(BOX_SCREEN, { boxId: data._id });
  }, [navigate, title]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../../assets/logo.png')} />

      <TextInput
        style={styles.input}
        placeholder="New Box Name"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <TouchableOpacity onPress={handleCreateBox} style={styles.button}>
        <Text style={styles.buttonText}>Create New Box</Text>
      </TouchableOpacity>
    </View>
  );
}
