import React, { Component } from 'react';

import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import logo from '../../assets/logo.png';

export default class Main extends Component {
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
        />
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.buttonText}>Create New Box</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
