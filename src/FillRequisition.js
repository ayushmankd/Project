import React from 'react'
import './schedule.css'
import fire from './firebase'
import { Button, Dropdown, DropdownToggle, DropdownMenu, 
  DropdownItem, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import FillScheduleTable from './FillScheduleTable';
export default class FillRequisition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown: false,
      dataToShow: [],
      date: null,
      session: props.match.params.session,
      currentDoc: '',
      currentScheduleData: '',
      branch: props.match.params.branch,
      compressedBranch: props.match.params.branch.toString().replace(/\s/g, ""),
      modal: false,
      alert: false,
      loading: true
    }
  }
  async componentDidMount() {
    let dataToShow = []
    let db = fire.firestore()
    var schedulesRef = db.collection("schedules")
    var schedulesRefNew = schedulesRef.where("session", "==", this.state.session)
    let schedules = await schedulesRefNew.get()
    schedules.docs.map((schedule) => {
      let data = schedule.data()
      data.schedule.forEach((item) => {
        var newObj = {
            date:     item.date,
            sitting:  item.sitting,
            required: item[this.state.compressedBranch].req,
            list:     item[this.state.compressedBranch].list
          }  
        dataToShow.push(newObj)
      })
      this.setState({ 
        dataToShow, 
        currentDoc: schedule.id, 
        currentScheduleData: data,
        loading: false
      })
    })
  }
  toggle() {
    this.setState(prevState => ({
      dropdown: !prevState.dropdown
    }));
  }
  check() {
    this.setState({ loading: true })
    var value = true
    this.state.dataToShow.forEach((item, index) => {
      item.list.forEach((name) => {
        if (name.name == '') {
          this.setState({ alert: true, loading: false })
          value = false
        }
      })
    })
    if (value)
      this.submit()
  }
  submit() {
    var dataToBeUpdated = this.state.currentScheduleData.schedule
    this.state.dataToShow.forEach((item, index) => {
      dataToBeUpdated[index][this.state.compressedBranch].list = item.list
    })
    let db = fire.firestore()
    db.collection('schedules').doc(this.state.currentDoc).update({
      schedule: dataToBeUpdated
    }).then(() => this.setState({ modal: true, loading: false }))
  }
  goToHome() {
    this.props.history.push('/dashboard-user/' + this.state.branch)
  }
  updateList = (list, index) => {
    let dataToShow = this.state.dataToShow
    dataToShow[index].list = list
    this.setState({ dataToShow })
  }
  render() {
    if (this.state.loading) {
      return (
        <div
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Spinner />
        </div>
      )
    } else {
      return (
        <div className="schedule-container">
          <header className="schedule-header">
            <div className="header-back">
              <Button
                color="primary"
                onClick={() => this.props.history.goBack()}
              >
                Back
            </Button>
            </div>
            <div className="header-text">
              <h1>
                {this.state.session}
              </h1>
            </div>
          </header>
          <div className="schedule-body">
            <h2>{this.state.branch}</h2>
            <div className="schedule-body-buttons">
              <Button>
                Print
            </Button>
              <Button onClick={() => this.check()}>
                Done
            </Button>
            </div>
            {
              this.state.dataToShow.map((item, indexTable) =>
                <div>
                  <div className="schedule-table-heading">
                    <h3>Date: {item.date} {item.sitting}</h3>
                    <h3>Required: {item.required}</h3>
                  </div>
                  <FillScheduleTable
                    list={item}
                    indexTable={indexTable}
                    updateList={this.updateList}
                    branch={this.state.branch}
                  />
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
              <Button color="primary" onClick={() => this.goToHome()}>
                Go to Home
            </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.alert}>
            <ModalHeader
              toggle={() => this.setState({ alert: false })}
            >
              Incomplete Data
          </ModalHeader>
            <ModalBody>
              All the Name Fields must be filled!!!
          </ModalBody>
          </Modal>
        </div>
      )
    }
  }
}