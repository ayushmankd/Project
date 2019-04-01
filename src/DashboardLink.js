import React from 'react'
import './dashboard_link.css'
export default class DashboardLink extends React.Component {
  render() {
    return (
      <div className="animation">
        <h2 className="dashboard-h2">[</h2>
        <h2 className="dashboard-h2">{this.props.heading}</h2>
        <h2 className="dashboard-h2">]</h2>
      </div>
    )
  }
}