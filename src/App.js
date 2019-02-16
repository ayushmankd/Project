import React, { Component } from 'react';
import './App.css';
import Login from './Login';
import NewSchedule from './NewSchedule'
import UserDashboard from './UserDashboard';
import Schedule from './Schedule';
import Requisition from './Requisition'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from './Dashboard';
import FillRequisition from './FillRequisition'
import ScheduleList from './ScheduleList';
import UpdateList from './UpdateList';
import ViewList from './ViewList'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" component={Login} exact={true}/>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/view-schedule" component={ScheduleList} />
            <Route path="/view-previous-schedule" component={ScheduleList} />
            <Route path="/new" component={NewSchedule} exact/>
            <Route path="/dashboard-user" component={UserDashboard} />
            <Route path="/schedule/:schedule" component={Schedule} />
            <Route path="/requisition" component={Requisition} />
            <Route path="/fill-new" component={FillRequisition} />
            <Route path="/update-list" component={UpdateList} />
            <Route path="/view-list" component={ViewList} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;