import React from 'react'
import './new-schedule.css'
import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Label, Popover, PopoverBody, PopoverHeader } from 'reactstrap'
import { Link } from 'react-router-dom'
import TableHeadingDashboard from './TableHeadingDashboard';
import TableRowDashboard from './TableRowDashboard';
export default class NewSchedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      numOfRows: [1, 2, 3],
      timings: [
        "7 AM - 10 AM",
        "8 AM - 11 AM",
        "9 AM - 12 PM",
        "10 AM - 1 PM",
        "11 AM - 2 PM",
        "12 PM - 3 PM",
        "1 PM - 4 PM",
        "2 PM - 5 PM",
        "3 PM - 6 PM",
        "4 PM - 7 PM"
      ],
      session: '',
      timing1: '10 AM - 1 PM',
      timing2: '2 PM - 5 PM',
      table: [],
      modal: true,
      popoverOpen: false
    }
  }
  addNewRow() {
    let newElement = this.state.numOfRows.slice(-1)[0] + 1
    this.setState({numOfRows: [...this.state.numOfRows, newElement]})
  }
  updateTable = (row) => {
    let table = this.state.table;
    table[row.rowNum - 1] = row
    this.setState({ table })
  }
  delete = (rowNum) => {
    let numOfRows = [...this.state.numOfRows]
    let index = numOfRows.indexOf(rowNum)
    numOfRows.splice(index, 1)
    this.setState({ numOfRows })
  }
  updateSession(session) {
    this.setState({ session })
  }
  updateTiming1(timing1) {
    this.setState({ timing1 })
  }
  updateTiming2(timing2) {
    this.setState({ timing2 })
  }
  getSession() {
    if 
      (
        this.state.session === '' ||
        this.state.timing1 === '' ||
        this.state.timing2 === ''
      )
      {
        this.setState({ popoverOpen: true })
      }
    else 
      this.setState({ modal: false })
  }
  render() {
    return(
      <div>
        <header className="new-schedule-header">
          <div className="header-back">
            <Button color="primary" onClick={() => this.props.history.goBack()}>Back</Button>
          </div>
        </header>
        <div className="new-schedule-container">
          <h1>Exam Schedule for {this.state.session}</h1>
          <Table bordered>
            <TableHeadingDashboard 
              timing1={this.state.timing1}
              timing2={this.state.timing2}
            />
            <tbody>
              {
                this.state.numOfRows.map(
                  (rowNum, index) => 
                    <TableRowDashboard 
                      rowNum={rowNum} 
                      key={index}
                      updateTable={this.updateTable}
                      delete={() => this.delete()}
                    />
                  )
              }
            </tbody>
          </Table>
          <div className="buttons">
            <Button onClick={() => this.addNewRow()}>
              Add New
            </Button>
            <Link to={{
              pathname: "/requisition",
              table: this.state.table,
              session: this.state.session
            }}>
              <Button>
                Next
              </Button>
            </Link>
            <Button color="danger" onClick={() => this.props.history.goBack()}>
              Cancel
            </Button>
          </div>
        </div>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Enter Details</ModalHeader>
          <ModalBody>
            <div className="row">
              <Label>Session:</Label>
              <Input 
                onChange={(sessionEvent) => this.updateSession(sessionEvent.target.value)}
                value={this.state.session}
              />
            </div>
            <div className="row">
              <Label>Timing (Sitting 1):</Label>
              <Input 
                type="select"
                value={this.state.timing1}
                onChange={(timing1Event) => this.updateTiming1(timing1Event.target.value)}
              >
                {
                  this.state.timings.map(
                    timing => 
                      <option>
                        {timing}
                      </option>
                    ) 
                }
              </Input>
            </div>
            <div className="row">
              <Label>Timing (Sitting 2):</Label>
              <Input
                type="select"
                value={this.state.timing2}
                onChange={(timing2Event) => this.updateTiming2(timing2Event.target.value)}
              >
                {
                  this.state.timings.map(
                    timing =>
                      <option>
                        {timing}
                      </option>
                  )
                }
              </Input>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => this.getSession()}
              id="OKBUTTON"
            >
              OK
            </Button>
            <Button color="danger" onClick={() => this.props.history.goBack()}>
              Cancel
            </Button>
            <Popover 
              placement="bottom" 
              isOpen={this.state.popoverOpen} 
              target="OKBUTTON">
              <PopoverHeader>Insufficient Data</PopoverHeader>
              <PopoverBody>
                Kindly fill up all the details.
              </PopoverBody>
            </Popover>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}