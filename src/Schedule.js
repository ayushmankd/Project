import React from 'react'
import './schedule.css'
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import ScheduleTable from './ScheduleTable';
export default class Schedule extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      dropdown: false,
      departments: ['Civil', 'CSE', 'Mechanical', 'Production', 'Chemical', 'Mettallurgy', 'Architecture'],
      data: [
        {
          date: '12-02-2019',
          sitting: '1st',
          total: 20,
          list: [{
            name: 'Mr. X',
            phone: '1234567890',
            email: 'xyz@email.com',
            branch: 'CSE'
          }, {
              name: 'Mr. Y',
              phone: '1234567890',
              email: 'abc@email.com',
              branch: 'Civil'
          }, {
            name: 'Ms. Q',
            phone: '213467321',
            email: 'asd@dmail.com',
            branch: 'Elec'
          }],
        }, {
          date: '13-02-2019',
          sitting: '1st',
          total: 20,
          list: [{
            name: 'Mr. X',
            phone: '1234567890',
            email: 'xyz@email.com',
            branch: 'CSE'
          }, {
            name: 'Mr. Y',
            phone: '1234567890',
            email: 'abc@email.com',
            branch: 'Civil'
          }, {
            name: 'Ms. Q',
            phone: '213467321',
            email: 'asd@dmail.com',
            branch: 'Elec'
          }],
        }, {
          date: '14-02-2019',
          sitting: '1st',
          total: 15,
          list: [{
            name: 'Mr. X',
            phone: '1234567890',
            email: 'xyz@email.com',
            branch: 'CSE'
          }, {
            name: 'Mr. Y',
            phone: '1234567890',
            email: 'abc@email.com',
            branch: 'Civil'
          }, {
            name: 'Ms. Q',
            phone: '213467321',
            email: 'asd@dmail.com',
            branch: 'Elec'
          }],
        }, {
          date: '15-02-2019',
          sitting: '1st',
          total: 10,
          list: [{
            name: 'Mr. X',
            phone: '1234567890',
            email: 'xyz@email.com',
            branch: 'CSE'
          }, {
            name: 'Mr. Y',
            phone: '1234567890',
            email: 'abc@email.com',
            branch: 'Civil'
          }, {
            name: 'Ms. Q',
            phone: '213467321',
            email: 'asd@dmail.com',
            branch: 'Elec'
          }],
        },
      ],
      dataToShow: [],
      date: null,
      session: props.match.params.schedule
    }
  }
  componentDidMount() {
    let dataToShow = []
    dataToShow = this.state.data
    this.setState({ dataToShow })
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
            <Dropdown isOpen={this.state.dropdownFilter} toggle={() => this.toggleFilter()}>
              <DropdownToggle caret>
                Filter
              </DropdownToggle>
              <DropdownMenu>
                {
                  this.state.departments.map((item) => <DropdownItem>{item}</DropdownItem>)
                }
              </DropdownMenu>
            </Dropdown>
            <Button>
              Print
            </Button>
          </div>
          {
            this.state.dataToShow.map((item) => 
            <div>
                <div className="schedule-table-heading">
                  <h3>Date: {item.date} {item.sitting} Sitting</h3>
                  <h3>Total: {item.total}</h3>
                </div>
                <ScheduleTable list={item.list}/>
            </div>)
          }
        </div>
      </div>
    )
  }
}