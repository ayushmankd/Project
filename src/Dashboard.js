import React from 'react'
import './dashboard.css'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import DashboardLink from './DashboardLink';
export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="dashboard-header-img">
            <img 
              src={require('./logo.png')} 
              alt="Logo" 
              height="100px" 
              width="100px" 
            />
          </div>
          <div className="dashboard-header-text">
            <h1>Allotment System</h1>
          </div>
          <div className="dashboard-logout-button">
            <Button 
              onClick={() => this.props.history.replace('/')}
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="dashboard-links">
          <Link to="/new">
            <DashboardLink heading={'Create New'}/>
          </Link>
          <Link to="/view-schedule">
            <DashboardLink heading={'View Schedules'} />
          </Link>
          <Link to="/view-list">
            <DashboardLink heading={'View Faculty List'} />
          </Link>
        </div>
      </div>
    )
  }
}