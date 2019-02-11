import React from 'react'
import './requisition.css'
import { Table, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
export default class Requisition extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      departments: ['Civil', 'CSE', 'Mechanical', 'Production', 'Chemical', 'Mettallurgy', 'Architecture'],
      table: props.location.table,
      // table: [{rowNum: 1, total: 320, date: 2019-12-12}],
      session: props.location.session,
      reqTable: [], 
      modal: false
    }
  }
  componentDidMount() {
    let reqTable = []
    this.state.table.forEach(element => {
      let newObj = []
      newObj.push(element.rowNum)
      newObj.push(element.date)
      let total = element.total
      this.state.departments.forEach(dept => {
        let randomNumber = Math.floor(Math.random() * (total - 1 + 1) + 1)
        newObj.push(randomNumber)
        total -= randomNumber
      })  
      newObj.push(element.total)
      reqTable.push(newObj)
    });
    this.setState({ reqTable })
  }
  // update(newValue, rowNum, index) {
  //   let reqTable = this.state.reqTable
  //   reqTable[rowNum][index] = newValue
  //   this.setState({ reqTable })  
  // }
  tableRow(row) {
    return (
      <tr rowNum={row[0]}>
        <th scope="row">
          <input type="date" value={row[1]} onChange={(newValue) => this.updateDate(newValue)} />
        </th>
        {this.state.departments.map((item, index) => 
          <td>
            <input 
              className="requisition-table-row" 
              value={row[index + 2]} 
              // onChange={(newValue) => this.update(newValue.target.valueAsNumber, row[0], index + 2)} 
            />
          </td>
        )}
        <td>
          <h5>
            {row[this.state.departments.length + 2]}
          </h5>
        </td>
      </tr>
    )
  }
  openModal() {
    this.setState({ modal: true });
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
                <th>Total</th>
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