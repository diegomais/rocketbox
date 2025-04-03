import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { BOX_KEY } from '@/constants/storage'
import { api } from '@/services/api'
import s from './styles'

export const MainScreen = () => {
  const { navigate } = useRouter()
  const [title, setTitle] = useState('')

  useEffect(() => {
    AsyncStorage.getItem(BOX_KEY).then((result) => {
      if (result) {
        navigate('/box')
      }
    })
  }, [])

  const handleCreateBox = useCallback(async () => {
    const { data } = await api.post('boxes', { title })

    await AsyncStorage.setItem(BOX_KEY, data._id)

    navigate('/box')
  }, [title])

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
  )
}
