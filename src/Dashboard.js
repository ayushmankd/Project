import React from 'react'
import './dashboard-styles.css'
import { Table, Button } from 'reactstrap'
export default class Dashboard extends React.Component {
  render() {
    return(
      <div className="dashboard-container">
        <div className="left-pane">
          <h3 className="left-pane-text">Create New</h3>
          <h3 className="left-pane-text">View Schedules</h3>
          <h3 className="left-pane-text">Update Availability</h3>
        </div>
        <div className="right-pane">
          <Table bordered>
            <thead>
              <tr>
                <th>Date</th>
                <th>1st Sitting</th>
                <th>2nd Sitting</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <input/>
                </th>
                <td>
                  <input/>
                </td>
                <td>
                  <input/>
                </td>
                <td>
                  <input/>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <input/>
                </th>
                <td>
                  <input/>
                </td>
                <td>
                  <input/>
                </td>
                <td>
                  <input/>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <input/>
                </th>
                <td>
                  <input/>
                </td>
                <td>
                  <input/>
                </td>
                <td>
                  <input/>
                </td>
              </tr>
            </tbody>
          </Table>
          <Button>
            Add New
          </Button>
        </div>
      </div>
    )
  }
}