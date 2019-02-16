import React from 'react'
import './schedule-list.css'
import { Link } from 'react-router-dom'
import { Button, Table } from 'reactstrap'
export default class ScheduleList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      schedule_list: ['2019-20', '2020-21']
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
          <Table bordered size="sm" style={{width: '350px'}}>
            <thead>
              <tr>
                <th colSpan={2}>Session</th>
              </tr>
            </thead>
            <tbody>
              {this.state.schedule_list.map((item) => 
                <tr>
                  <td>{item}</td>
                    <td>
                      <a href={"/schedule/" + item}>View</a>
                    </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}