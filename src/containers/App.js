import React, { Component } from 'react';
import './App.css';

import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  state = {
    likes: 0,
    links: [
      'http://www.google.com',
      'http://www.amazon.com'
    ],
    mood: 'Happy',
    showInfo: false
  }

  changeMoodHandler = (event) => {
    this.setState({
      mood: event.target.value
    })
  }

  incrementLikesHandler = () => {
    this.setState({
      likes: this.state.likes + 1
    });
  }

  showInfoHandler = () => {
    const doesShow = this.state.showInfo;
    this.setState({showInfo: !doesShow});
  }

  render() {
    return (
      <div className="App">
        <Cockpit
          changed={this.changeMoodHandler}
          incremented={this.incrementLikesHandler}
          likes={this.state.likes}
          mood={this.state.mood}
          show={this.state.showInfo}
          showed={this.showInfoHandler} />
      </div>
    );
  }
}

export default App;
