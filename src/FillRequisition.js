import React from 'react'
import './schedule.css'
import fire from './firebase'
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import FillScheduleTable from './FillScheduleTable';
export default class FillRequisition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown: false,
      dataToShow: [],
      date: null,
      session: '2019',
      currentDoc: '',
      currentScheduleData: '',
      branch: props.location.branch,
      modal: false
    }
  }
  async componentDidMount() {
    let dataToShow = []
    let db = fire.firestore()
    var schedulesRef = db.collection("schedules")
    var schedulesRefNew = schedulesRef.where("session", "==", "2019 Even Sem")
    let schedules = await schedulesRefNew.get()
    schedules.docs.map((schedule) => {
      let data = schedule.data()
      for (const key in data.schedule) {
        if (data.schedule.hasOwnProperty(key)) {
          const element = data.schedule[key];
          var newObj = {
            date: key,
            required: element[this.state.branch].req,
            list: element[this.state.branch].list
          }  
        }
        dataToShow.push(newObj)
      }
      this.setState({ dataToShow, currentDoc: schedule.id, currentScheduleData: data }, () => console.log(this.state.dataToShow))
    })
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
  updateList = (newList, index) => {
    let dataToShow = [...this.state.dataToShow]
    dataToShow[index].list = newList
    this.setState({ dataToShow })
  }
  submit() {
    var dataToBeUpdated = this.state.currentScheduleData.schedule
    this.state.dataToShow.forEach((item) => {
      dataToBeUpdated[item.date]['CSEA'].list = item.list
    })
    let db = fire.firestore()
    db.collection('schedules').doc(this.state.currentDoc).update({
      schedule: dataToBeUpdated
    }).then(() => this.setState({ modal: true }))
  }
  goToHome() {
    this.props.history.push('/dashboard-user/' + this.state.branch)
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
                  this.state.dataToShow.map((item) => <DropdownItem onClick={() => this.filterDate(item.date)}>{item.date}</DropdownItem>)
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
            <Button onClick={() => this.submit()}>
              Done
            </Button>
          </div>
          {
            this.state.dataToShow.map((item, indexTable) =>
              <div>
                <div className="schedule-table-heading">
                  <h3>Date: {item.date}</h3>
                  <h3>Required: {item.required}</h3>
                </div>
                <FillScheduleTable list={item} indexTable={indexTable} updateList={this.updateList}/>
              </div>
            )
          }
        </div>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Success</ModalHeader>
          <ModalBody>
            Requisition List has been Sent.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.goToHome()}>Go to Home</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}