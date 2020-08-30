import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import styles from './styles';
import logo from '../../assets/logo.png';

export default class Main extends Component {
  state = {
    newBox: ''
  };

  async componentDidMount() {
    const box = await AsyncStorage.getItem('@RocketBox:box');

    if (box) {
      this.props.navigation.navigate('Box');
    }
  };

  handleCreateBox = async () => {
    const response = await api.post('boxes', {
      title: this.state.newBox,
    });

    await AsyncStorage.setItem('@RocketBox:box', response.data._id);

    this.props.navigation.navigate('Box');
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <TextInput
          style={styles.input}
          placeholder='New Box Name'
          placeholderTextColor='#999'
          autoCapitalize='none'
          autoCorrect={false}
          underlineColorAndroid='transparent'
          value={this.state.newBox}
          onChangeText={text => this.setState({ newBox: text })}
        />
        <TouchableOpacity onPress={this.handleCreateBox} style={styles.button}>
          <Text style={styles.buttonText}>Create New Box</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
