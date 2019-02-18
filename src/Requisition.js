import React from 'react'
import './requisition.css'
import fire from './firebase'
import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
export default class Requisition extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      departments: [
        'Civ',
        'Elec',
        'Mech',
        'CSEA',
        'ETC',
        'Chem',
        'Mett',
        'Arch',
        'Prod',
        'Phy',
        'Chem',
        'Math',
        'Eng',
        'Mngmt',
        'Eco'
      ],
      table: props.location.table,
      session: props.location.session,
      reqTable: [], 
      modal: false
    }
  }
  componentDidMount() {
    let reqTable = []
    this.state.table.forEach(element => {
      let newObj = {}
      let req = Math.ceil(parseInt(element.total, 10) / 20) + 3;
      Object.defineProperties(newObj, {
        'rowNum': {
          value: element.rowNum,
          writable: true,
          enumerable: true
        },
        'date': {
          value: element.date,
          writable: true,
          enumerable: true
        },
        'total': {
          value: element.total,
          writable: true,
          enumerable: true
        },
        'req': {
          value: req,
          writable: true,
          enumerable: true
        },
      })
      let tempReq = req
      this.state.departments.forEach(element => {
        if (tempReq != 0) {
          Object.defineProperty(newObj, element, {
            value: 1, writable: true, enumerable: true })
          tempReq--;
        } else {
          Object.defineProperty(newObj, element, { value: 0, writable: true, enumerable: true })
        }
      });
      if (tempReq != 0)
        newObj['Civ'] += tempReq
      reqTable.push(newObj)
    });
    this.setState({ reqTable })
  }
  tableRow(row) {
    return (
      <tr rowNum={row.rowNum}>
        <th scope="row">
          <input type="date" value={row.date} onChange={(newValue) => this.updateDate(newValue)} />
        </th>
        {this.state.departments.map((item, index) => 
          <td>
            <input 
              className="requisition-table-row" 
              value={row[item]} 
            />
          </td>
        )}
        <td>
          <h5>
            {row.total}
          </h5>
        </td>
        <td>
          <h5>
            {row.req}
          </h5>
        </td>
      </tr>
    )
  }
  openModal() {
    let db = fire.firestore()
    var docRef = db.collection('schedules')
    var objectToAdd = {
      session: this.state.session,
      schedule: {}
    }
    this.state.reqTable.forEach(element => {
      var tempObj = {
        total_req: element.req,
        total_students: element.total
      }
      this.state.departments.forEach(
        branch => {
          Object.defineProperty(tempObj, branch, {
            value: {
              req: element[branch],
              list: []
            },
            enumerable: true,
            writable: true
          })
        } 
      )
      Object.defineProperty(objectToAdd.schedule, element.date, {
        value: tempObj,
        enumerable: true,
        writable: true
      })
    })
    docRef.add(objectToAdd).then(() => this.setState({ modal: true }));
  }
  goToHome() {
    this.setState({modal: false}, () => this.props.history.push('/dashboard'))
  }
  render() {
    return (
      <div>
        <header className="requisition-header">
          <h4>View Previous Schedules</h4>
        </header>
        <div className="requisition-container">
          <h1>Requisition for {this.state.session}</h1>
          <Table bordered responsive size="sm">
            <thead>
              <tr>
                <th>Date</th>
                {this.state.departments.map((item) => <th>{item}</th>)}
                <th>Total Students</th>
                <th>Total Requirement</th>
              </tr>
            </thead>
            <tbody>
              {this.state.reqTable.map((item) => this.tableRow(item))}
            </tbody>
          </Table>
          <Button onClick={() => this.openModal()}>
            Finalize
          </Button>
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