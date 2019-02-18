import React from 'react'
import './schedule-list.css'
import { Link } from 'react-router-dom'
import fire from './firebase'
import { Button, Table } from 'reactstrap'
export default class ScheduleList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      schedule_list: []
    }
  } 
  async componentDidMount() {
    let schedule_list = []
    let db = fire.firestore()
    let schedules = await db.collection('schedules').get()
    schedules.forEach((session) => {
      var toPush = session.data()
      schedule_list.push(toPush)
    })
    console.log(schedule_list)
    this.setState({ schedule_list })
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
                  <td>{item.session}</td>
                    <td>
                      <Link to={{
                        pathname: '/schedule/' + item.session,
                        data: item
                      }}>
                        View
                      </Link>
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