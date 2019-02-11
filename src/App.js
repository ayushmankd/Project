import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import NewSchedule from './NewSchedule'
import User_Dashboard from './User';
import Schedule from './Schedule';
import Requisition from './Requisition'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from './Dashboard';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" component={Login} exact={true}/>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/new" component={NewSchedule} exact/>
            <Route path="/dashboard_user" component={User_Dashboard} />
            <Route path="/schedule" component={Schedule} />
            <Route path="/requisition" component={Requisition} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
