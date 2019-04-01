import React from 'react'
import './requisition.css'
import fire from './firebase'
import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader, Alert } from 'reactstrap'
export default class Requisition extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      table: props.location.table,
      session: props.location.session,
      currentTable: [],
      branches: [],
      alertOpen: false
    }
  }
  componentDidMount() {
    this.getBranches()
    let currentTable = []
    this.state.table.forEach((item) => {
      let obj1 = {
        'date': item.date,
        'sitting': '1st Sitting',
        'totalStudents': item.firstSitting,
        'totalReq': Math.round((parseInt(item.firstSitting, 10) / 20 * 1.1) + 2),
      }
      let obj2 = {
        'date': item.date,
        'sitting': '2nd Sitting',
        'totalStudents': item.secondSitting,
        'totalReq': Math.round((parseInt(item.secondSitting, 10) / 20 * 1.1) + 2),
      }
      currentTable.push(obj1)
      currentTable.push(obj2)
    })
    this.setState({
      currentTable
    })
  }
  getBranches() {
    let branches = []
    let db = fire.firestore()
    db.collection('teachers').get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        branches.push({
          branch: doc.id,
          list: doc.data().list,
          total: doc.data().list.length,
          ratio: '0'
        })
      })
      this.setState({ branches })
    }).then(() => this.getRatios())
  }
  getRatios() {
    let branches = this.state.branches
    let totalFaculties = 0;
    branches.forEach((item) => {
      totalFaculties += item.total
    })
    branches.forEach((item) => {
      item.ratio = item.total / totalFaculties
    })
    this.setState({ branches })
  }
  finalize() {
      let db = fire.firestore()
      var docRef = db.collection('schedules')
      var objectToAdd = {
        session: this.state.session,
        schedule: []
      }
      this.state.currentTable.forEach(element =>{
        this.state.branches.forEach(
          branch => {
            Object.defineProperty(element, branch.branch, {
              value: {
                req: Math.round(element.totalReq * parseFloat(branch.ratio)),
                list: []
              },
              enumerable: true,
              writable: true
            })
          }
        )
        objectToAdd.schedule.push(element)
      })
      docRef.add(objectToAdd).then(() => this.setState({ alertOpen: true }));
  }
  gotoHome() {
    this.setState({alertOpen: false}, () => this.props.history.push('/dashboard'))
  }
  render() {
    return (
      <div>
        <Modal isOpen={this.state.alertOpen}>
          <ModalHeader>
            Requisition List Sent!
          </ModalHeader>
          <ModalFooter>
            <Button color="primary" onClick={() => this.gotoHome()}>
              Back to Home
            </Button>
          </ModalFooter>
        </Modal>
        <header className="requisition-header">
          <h2 className="requisition-h1">
            Requisition List for {this.state.session}
          </h2>
          <Button
            color="primary"
            onClick={() => this.finalize()}
          >
            Finalize
          </Button>
        </header>
        <div className="requisition-container">
          <Table bordered>
            <tr>
              <td>
                <b>
                  Branch
                </b>
              </td>
              {
                this.state.currentTable.map(item => 
                  <td
                    style={{
                      minWidth: '100px'
                    }}
                  >
                    <b>
                      {item.date} {'\n'} {item.sitting}
                    </b>
                  </td>
                )
              }
            </tr>
            {
              this.state.branches.map((item) => 
                <tr>
                  <td>
                    {item.branch}
                  </td>
                  {
                    this.state.currentTable.map(req =>
                      <td>
                        {/* <input 
                          value={Math.round(req.totalReq * Math.fround(parseFloat(item.ratio)))}
                        /> */}
                        {Math.round(req.totalReq * parseFloat(item.ratio))}
                      </td>
                    )
                  }
                </tr>
              )
            }
            <tr>
              <td>
                <b>Total Required</b>
              </td>
              {
                this.state.currentTable.map(item =>
                  <td>
                    <b>{item.totalReq}</b>
                  </td>
                )
              }
            </tr>
            <tr>
              <td>
                <b>Total Students</b>
              </td>
              {
                this.state.currentTable.map(item =>
                  <td>
                    <b>{item.totalStudents}</b>
                  </td>
                )
              }
            </tr>
          </Table>
        </div>
      </div>
    )
  }
}