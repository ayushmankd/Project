import React from 'react'
import './dashboard-styles.css'
import { Table, Button } from 'reactstrap'
export default class User_Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard-container">
        <div className="left-pane">
          <h3 className="left-pane-text">View Previous Schedules</h3>
          <h3 className="left-pane-text">Contact</h3>
        </div>
        <div className="right-pane">
          <div className="table-heading">
            <h2>Date: 12/2/19 1st Sitting</h2>
            <h2>Required: 4</h2>
          </div>
          <Table bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
              </tr>
              <tr>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
              </tr>
              <tr>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
              </tr>
              <tr>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="table-heading">
            <h2>Date: 12/2/19 2nd Sitting</h2>
            <h2>Required: 2</h2>
          </div>
          <Table bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
              </tr>
              <tr>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
                <td>
                  <input />
                </td>
              </tr>
            </tbody>
          </Table>
          <Button>
            Send
          </Button>
        </div>
      </div>
    )
  }
}