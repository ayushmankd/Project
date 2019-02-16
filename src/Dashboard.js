import React from 'react'
import './dashboard.css'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="dashboard-header-img">
            <img src={require('./logo.png')} alt="Logo" height="100px" width="100px" />
          </div>
          <div className="dashboard-header-text">
            <h1>Allotment System</h1>
          </div>
          <div className="dashboard-logout-button">
            <Button onClick={() => this.props.history.replace('/')}>
              Logout
            </Button>
          </div>
        </div>
        <div className="dashboard-links">
          <Link to="/new">
            <div className="animation">
              <h2 className="dashboard-h2">[</h2>
              <h2 className="dashboard-h2">Create New</h2>
              <h2 className="dashboard-h2">]</h2>
            </div>
          </Link>
          <Link to="/view-schedule">
            <div className="animation">
              <h2 className="dashboard-h2">[</h2>
              <h2 className="dashboard-h2">View Schedules</h2>
              <h2 className="dashboard-h2">]</h2>
            </div>
          </Link>
          <Link to="/view-list">
            <div className="animation">
              <h2 className="dashboard-h2">[</h2>
              <h2 className="dashboard-h2">View List</h2>
              <h2 className="dashboard-h2">]</h2>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}