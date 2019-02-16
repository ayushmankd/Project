import React from 'react'
import './schedule-list.css'
import { Link } from 'react-router-dom'
import { Button, Table } from 'reactstrap'
export default class UpdateList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          'name': 'XYZ',
          'phone': '12345678',
          'email': 'wxy@aswd.com'
        },
        {
          'name': 'XYZ',
          'phone': '12345678',
          'email': 'wxy@aswd.com'
        },
        {
          'name': 'XYZ',
          'phone': '12345678',
          'email': 'wxy@aswd.com'
        },
        {
          'name': 'XYZ',
          'phone': '12345678',
          'email': 'wxy@aswd.com'
        },
      ]
    }
  }
  render() {
    return (
      <div className="schedule-list-container">
        <header className="schedule-list-header">
          <div className="header-back">
            <Button color="primary" onClick={() => this.props.history.goBack()}>Back</Button>
          </div>
        </header>
        <div className="schedule-list-body">
          <Table bordered size="sm" style={{ width: '350px' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {this.state.list.map((item) =>
                <tr>
                  <td>
                    <input value={item.name}/>
                  </td>
                  <td>
                    <input value={item.phone}/>
                  </td>
                  <td>
                    <input value={item.email}/>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <Button>
          Save
        </Button>
      </div>
    )
  }
}