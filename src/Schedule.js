import React from 'react'
import './schedule.css'
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import ScheduleTable from './ScheduleTable';
export default class Schedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown: false,
      departments: [],
      data: props.location.data,
      dataToShow: [],
      date: null,
      session: props.match.params.schedule
    }
  }
  componentDidMount() {
    let dataToShow = Object.keys(this.state.data.schedule)
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
          {/* <div className="header-date-picker">
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
          </div> */}
        </header>
        <div className="schedule-body">
          <div className="schedule-body-buttons">
            {/* <Dropdown isOpen={this.state.dropdownFilter} toggle={() => this.toggleFilter()}>
              <DropdownToggle caret>
                Filter
              </DropdownToggle>
              <DropdownMenu>
                {
                  this.state.departments.map((item) => <DropdownItem>{item}</DropdownItem>)
                }
              </DropdownMenu>
            </Dropdown> */}
            <Button>
              Print
            </Button>
          </div>
          {
            this.state.dataToShow.map((item) => 
            <div>
                <div className="schedule-table-heading">
                  <h3>Date: {item} </h3>
                  <h3>Total Required: {this.state.data['schedule'][item].total_req}</h3>
                </div>
                <ScheduleTable list={this.state.data['schedule'][item]} />
            </div>)
          }
        </div>
      </div>
    )
  }
}