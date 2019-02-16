import React from 'react'
import './schedule.css'
import fire from './firebase'
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import FillScheduleTable from './FillScheduleTable';
export default class FillRequisition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown: false,
      data: [
        {
          date: '12-02-2019',
          sitting: '1st',
          required: 2,
          list: [],
        }, 
        {
          date: '13-02-2019',
          sitting: '1st',
          required: 2,
          list: [],
        }, 
        {
          date: '14-02-2019',
          sitting: '1st',
          required: 1,
          list: [],
        }, {
          date: '15-02-2019',
          required: 3,
          list: [],
        },
      ],
      dataToShow: [],
      date: null,
      session: '2019'
    }
  }
  async componentDidMount() {
    let dataToShow = []
    let db = fire.firestore()
    var schedulesRef = db.collection("schedules")
    var schedulesRefNew = schedulesRef.where("session", "==", "2019")
    let schedules = await schedulesRefNew.get()
    schedules.docs.map(async (schedule) => {
      var schedule_list = schedule.ref
      let schedule_data = await schedule_list.collection('schedule').get()
        schedule_data.docs.map(async (data) => {
          var temp = data.data()
          var newObj = {
            date: temp.date,
            required: '',
            list: []
          }
          var branch_list = data.ref
          let branches = await branch_list.collection('branch_req').where("branch", "==", "CSEA").get()
          branches.docs.map((branch) => {
            var tempB = branch.data()
            console.log(tempB)
            newObj.required = tempB.req
          })
          dataToShow.push(newObj)
        })
    })
    this.setState({ dataToShow }, () => console.log(this.state.dataToShow))
  }
  toggle() {
    this.setState(prevState => ({
      dropdown: !prevState.dropdown
    }));
  }
  filterDate(date) {
    this.setState({ date })
    let dataToShow = []
    if (date == null)
      dataToShow = this.state.data
    else
      dataToShow = this.state.data.filter((item) => date == item.date)
    this.setState({ dataToShow })
  }
  render() {
    return (
      <div className="schedule-container">
        <header className="schedule-header">
          <div className="header-back">
            <Button color="primary" onClick={() => this.props.history.goBack()}>Back</Button>
          </div>
          <div className="header-text">
            <h1>
              {this.state.session}
            </h1>
          </div>
          <div className="header-date-picker">
            <Dropdown isOpen={this.state.dropdown} toggle={() => this.toggle()}>
              <DropdownToggle caret>
                {this.state.date != null ? this.state.date : 'Select Date'}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => this.filterDate(null)}>Show All</DropdownItem>
                {
                  this.state.data.map((item) => <DropdownItem onClick={() => this.filterDate(item.date)}>{item.date}</DropdownItem>)
                }
              </DropdownMenu>
            </Dropdown>
          </div>
        </header>
        <div className="schedule-body">
          <div className="schedule-body-buttons">
            <Button>
              Print
            </Button>
            <Button>
              Done
            </Button>
          </div>
          {
            this.state.dataToShow.map((item) =>
              <div>
                <div className="schedule-table-heading">
                  <h3>Date: {item.date}</h3>
                  <h3>Required: {item.required}</h3>
                </div>
                <FillScheduleTable list={item} />
              </div>
            )
          }
        </div>
      </div>
    )
  }
}