import React from 'react'
import './schedule.css'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap'
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
      printData:    [],
      showRequisitionList: false,
      currentRequisitionList: [],
      isHovered: false
    }
  }
  componentDidMount() {
    let dataToShow = []
    let departments = []
    let totalReqCompleted = 0
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
        departments = arr
      })
      
    }
    this.setState({ dataToShow, departments, totalReqCompleted }, () => this.printData())
  }
  toggle() {
    this.setState(prevState => ({
      dropdown: !prevState.dropdown
    }));
  }
  printData() {
    let head = [{}]
    let printData = []
    let dataToShow = this.state.dataToShow
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
    dataToShow.forEach((item, index) => {
      var max = 0
      var totalReqCompleted = 0
      var requisitionList = []
      this.state.departments.forEach((branch) => {
        if (max < item[branch].list.length)
          max = item[branch].list.length
        var newObj = {
          branch: branch,
          req: item[branch].req,
          date: item.date,
          sitting: item.sitting
        }
        requisitionList.push(newObj)
        totalReqCompleted += item[branch].list.length
      })
      Object.defineProperty(item, 'totalReqCompleted', {
        value: totalReqCompleted,
        enumerable: true,
        writable: true
      })
      Object.defineProperty(item, 'requisitionList', {
        value: requisitionList,
        enumerable: true,
        writable: true
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
    this.setState({ head, printData, dataToShow })
  }
  genrateTable() {
    const doc = new jsPDF('l', 'mm', 'a4')
    doc.autoTable({
      head: this.state.head,
      body: this.state.printData,
      theme: 'grid',
      didDrawPage: (data) => {
        doc.setFontSize(18);
        doc.setTextColor(40);
        doc.setFontStyle('normal');
        doc.text(
          "Indira Gandhi Institue of Technology, Sarang" + '\n' +
          "Invigilation Duty Chart for Diploma \t" + this.state.session + '\n' +
          "First Sitting: " + '\t\t' +
          "Second Sitting: ", 80, 10);
      },
      margin: { top: 40 }
    });
    doc.save(this.state.session + '.pdf');
  }
  showModal(currentRequisitionList) {
    this.setState({ currentRequisitionList, showRequisitionList: true })
  }
  handleHover() {
    this.setState(prevState => ({
      isHovered: !prevState.isHovered
    }), () => {
      if (this.state.isHovered) 
        this.setState({ class: 'show' })
    });
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
        </header>
        <div className="schedule-body">
          <div className="schedule-body-buttons">
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
                  <h3 
                    onClick={() => this.showModal(item.requisitionList)}
                    className={this.state.class} 
                    onMouseEnter={() => this.handleHover()} 
                    onMouseLeave={() => this.handleHover()}
                  >
                    Remaining: {item.totalReq - item.totalReqCompleted}
                  </h3>
                  <h3>Total Students: {item.totalStudents}</h3>
                </div>
                <ScheduleTable list={item} branch={this.state.branch}/>
            </div>)
          }
        </div>
        <Modal
          isOpen = {this.state.showRequisitionList}
        >
          <ModalHeader
            toggle = {() => this.setState({ showRequisitionList: false })} 
          >
            {
              this.state.currentRequisitionList[0] != undefined 
                ? 
                  this.state.currentRequisitionList[0].date + "\t" + this.state.currentRequisitionList[0].sitting
                :
                  ''
              }
          </ModalHeader>
          <ModalBody>
            <Table bordered striped size="sm">
              <thead>
                <tr>
                  <th>
                    Sl No.
                  </th>
                  <th>
                    Department
                  </th>
                  <th>
                    Required
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.currentRequisitionList.map((item, index) => 
                    <tr>
                      <td>
                        {(index + 1).toString()}
                      </td>
                      <td>
                        {item.branch}
                      </td>
                      <td>
                        {item.req}
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => this.setState({ showRequisitionList: false })}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}