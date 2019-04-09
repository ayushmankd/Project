import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import NewSchedule from './NewSchedule'
import UserDashboard from './UserDashboard';
import Schedule from './Schedule';
import Requisition from './Requisition'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard';
import FillRequisition from './FillRequisition'
import ScheduleList from './ScheduleList';
import UpdateList from './UpdateList';
import ViewList from './ViewList'
import ViewPasswordList from './ViewPasswordList'
import Page_404 from './Page_404.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={Login} exact={true}/>
            <Route path="/dashboard" component={Dashboard} exact/>
            <Route path="/view-schedule" component={ScheduleList} exact />
            <Route path="/view-previous-schedule/:branch" exact component={ScheduleList} />
            <Route path="/new" component={NewSchedule} exact/>
            <Route path="/dashboard-user/:branch" exact component={UserDashboard} />
            <Route path="/schedule/:schedule" exact component={Schedule} />
            <Route path="/requisition" exact component={Requisition} />
            <Route path="/fill-new/:branch/:session" exact component={FillRequisition} />
            <Route path="/update-list" exact component={UpdateList} />
            <Route path="/view-list" exact component={ViewList} />
            <Route path="/view-password-list" exact component={ViewPasswordList} />
            <Route component={Page_404} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
