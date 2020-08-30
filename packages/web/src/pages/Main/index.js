import React, { Component } from 'react';
import api from '../../services/api';

import logo from '../../assets/logo.svg'
import './styles.css';

export default class Main extends Component {
  state = {
    newBox: ''
  };
  handleSubmit = async e => {
    e.preventDefault();

    const response = await api.post('boxes', {
      title: this.state.newBox,
    });

    this.props.history.push(`/box/${response.data._id}`);
  };

  render() {
    return (
      <div id='main-container'>
        <form onSubmit={this.handleSubmit}>
          <img src={logo} alt='RocketBox Logo' />
          <input
            placeholder='New Box Name'
            value={this.state.newBox}
            onChange={e => this.setState({ newBox: e.target.value })}
          />
          <button type='submit'>Create New Box</button>
        </form>
      </div>
    );
  }
}
