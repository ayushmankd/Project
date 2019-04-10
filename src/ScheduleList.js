import React from 'react'
import './schedule-list.css'
import { Link } from 'react-router-dom'
import fire from './firebase'
import { Button, Table, Spinner } from 'reactstrap'
export default class ScheduleList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      schedule_list: [],
      branch: props.match.params.branch,
      schedule_ids: [],
      loading: true
    }
  } 
  componentDidMount() {
    this.getData()  
  }
  async getData() {
    let schedule_list = []
    let schedule_ids = []
    let db = fire.firestore()
    let schedules = await db.collection('schedules').get()
    schedules.forEach((session) => {
      var toPush = session.data()
      schedule_ids.push(session.id)
      schedule_list.push(toPush)
    })
    this.setState({ schedule_list, schedule_ids, loading: false })
  }
  deleteSchedule( index ) {
    this.setState({ loading: true })
    let id = this.state.schedule_ids[index]
    let db = fire.firestore()
    db.collection('schedules').doc(id).delete().then(() => this.getData())
  }
  render() {
    if (this.state.loading) {
      return (
        <div
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Spinner />
        </div>
      )
    } else {
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
                  <th colSpan={3}>Session</th>
                </tr>
              </thead>
              <tbody>
                {this.state.schedule_list.map((item, index) =>
                  <tr>
                    <td>{item.session}</td>
                    <td>
                      <Link to={{
                        pathname: '/schedule/' + item.session,
                        data: item,
                        branch: this.state.branch
                      }}>
                        View
                    </Link>
                    </td>
                    {
                      this.state.branch == undefined ? 
                        <td onClick={() => this.deleteSchedule(index)}>
                          <img
                            src="https://img.icons8.com/ios/50/000000/trash.png"
                            height="30px"
                            width="30px"
                            style={{
                              marginRight: '10px'
                            }}
                          />
                        </td>
                        :
                        <td>
                          
                        </td>
                    }
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )
    }
  }
}