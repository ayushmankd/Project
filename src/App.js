import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard'
import User_Dashboard from './User';
import Schedule from './Schedule';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Schedule />
      </div>
    );
  }
}

export default App;
