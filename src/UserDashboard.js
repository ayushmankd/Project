import React from 'react'
import './user-dashboard.css'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
export default class UserDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      branch: props.match.params.branch
    }
  }
  render() {
    return (
      <div className="user-dashboard-container">
        <div className="user-dashboard-header">
          <div className="user-dashboard-header-img">
            <img src={require('./logo.png')} alt="Logo" height="100px" width="100px" />
          </div>
          <div className="user-dashboard-header-text">
            <h1>Allotment System</h1>
          </div>
          <div className="user-dashboard-logout-button">
            <Button onClick={() => this.props.history.replace('/')}>
              Logout
            </Button>
          </div>
        </div>
        <div className="user-dashboard-links">
          <Link 
            to={{
              pathname: "/fill-new",
              branch: this.state.branch
            }}
          >
            <div className="animation">
              <h2 className="user-dashboard-h2">[</h2>
              <h2 className="user-dashboard-h2">Fill New Schedule</h2>
              <h2 className="user-dashboard-h2">]</h2>
            </div>
          </Link>
          <Link to="/view-previous-schedule">
            <div className="animation">
              <h2 className="user-dashboard-h2">[</h2>
              <h2 className="user-dashboard-h2">View Previous Schedules</h2>
              <h2 className="user-dashboard-h2">]</h2>
            </div>
          </Link>
          <Link to="/update-list">
            <div className="animation">
              <h2 className="user-dashboard-h2">[</h2>
              <h2 className="user-dashboard-h2">Update List</h2>
              <h2 className="user-dashboard-h2">]</h2>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}