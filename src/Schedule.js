import React from 'react'
import './schedule.css'
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import ScheduleTable from './ScheduleTable';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
export default class Schedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown:     false,
      departments:  [],
      data:         props.location.data,
      dataToShow:   [],
      date:         null,
      session:      props.match.params.schedule,
      branch:       props.location.branch,
      arr:          [],
      head:         [],
      printData:    []
    }
    console.log(props.location.data)
  }
  componentDidMount() {
    let dataToShow = []
    let departments = []
    if (this.state.branch != undefined) {
      this.state.data.schedule.forEach((item, index) => {
        var newObj = item
        newObj.totalReq = item[this.state.branch].req
        dataToShow.push(newObj)
      })
    } else {
      dataToShow = this.state.data.schedule
      dataToShow.forEach(item => {
        let arr = Object.keys(item)
        arr.splice(arr.length - 4, 4)
        let ind = arr.findIndex((search) => search == 'Mett. & Materials')
        arr.splice(ind, 1)
        departments = arr
      })
    }
    this.setState({ dataToShow, departments }, () => this.printData())
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
      dataToShow = this.state.data.schedule
    else
      dataToShow = this.state.data.schedule.filter((item) => date == item.date)
    this.setState({ dataToShow })
  }
  printData() {
    let head = [{}]
    let printData = []
    Object.defineProperty(head[0], 'date', {
      value: 'Date',
      enumerable: true,
      writable: true
    })
    this.state.departments.forEach(branch => {
      Object.defineProperty(head[0], branch.toString().replace(/\s/g, ""), {
        value: branch,
        enumerable: true,
        writable: true
      })
    })
    var maxes = []
    this.state.dataToShow.forEach((item, index) => {
      var max = 0
      this.state.departments.forEach((branch) => {
        if (max < item[branch].list.length)
          max = item[branch].list.length
      })
      for (let i = 0; i < max; i++) {
        let newObj = {}
        Object.defineProperty(newObj, 'date', {
          value: item.date + '\n' + item.sitting,
          enumerable: true,
          writable: true
        })
        for (let j = 0; j < this.state.departments.length; j++) {
          let data = this.state.dataToShow[index][this.state.departments[j]]['list'][i]
          if (data == undefined)
            continue
          else {
            Object.defineProperty(newObj, this.state.departments[j].toString().replace(/\s/g, ""), {
              value: data.name,
              enumerable: true,
              writable: true
            })
          }
        }
        printData.push(newObj)
      }
      maxes.push(max)
    })
    let i = 0
    let prev = 0
    for (let index = 0; index <= printData.length; index++) {
      if ((index - prev) == maxes[i]) {
        printData[index - maxes[i]]['date'] = {
          rowSpan: maxes[i],
          content: printData[index - maxes[i]]['date'],
          styles: { valign: 'middle', halign: 'center' }
        }
        prev = index
        i++
      }
    }
    this.setState({ head, printData })
  }
  genrateTable() {
    const doc = new jsPDF('l', 'mm', 'a4')
    doc.autoTable({
      head: this.state.head,
      body: this.state.printData,
      theme: 'grid'});
    doc.save('Print.pdf');
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
            <Button
              onClick={() => this.genrateTable()}
            >
              Print
            </Button>
          </div>
          {
            this.state.dataToShow.map((item) => 
            <div>
                <div className="schedule-table-heading">
                  <h3>Date: {item.date} {item.sitting} </h3>
                  <h3>Total Required: {item.totalReq}</h3>
                  <h3>Total Students: {item.totalStudents}</h3>
                </div>
                <ScheduleTable list={item} branch={this.state.branch}/>
            </div>)
          }
        </div>
      </div>
    )
  }
}