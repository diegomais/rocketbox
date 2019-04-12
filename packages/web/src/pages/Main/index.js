import React, { Component } from 'react';

import logo from '../../assets/logo.svg'
import './styles.css';

export default class Main extends Component {
  render() {
    return (
      <div id='main-container'>
        <form>
          <img src={logo} alt='RocketBox Logo' />
          <input placeholder='New Box Name' />
          <button type='submit'>Create New Box</button>
        </form>
      </div>
    );
  }
}
