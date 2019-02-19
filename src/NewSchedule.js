import React from 'react'
import './new-schedule.css'
import { Table, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
// import LeftPaneDashboard from './LeftPaneDashboard';
import TableHeadingDashboard from './TableHeadingDashboard';
import TableRowDashboard from './TableRowDashboard';
export default class NewSchedule extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      numOfRows: [1, 2, 3],
      session: '',
      table: []
    }
  }
  addNewRow() {
    let newElement = this.state.numOfRows.slice(-1)[0] + 1
    this.setState({numOfRows: [...this.state.numOfRows, newElement]})
  }
  componentDidMount() {
    let session = prompt('Exam Schedule for Session?')
    this.setState({ session })
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
          <TableHeadingDashboard />
          <tbody>
            {
              this.state.numOfRows.map(
                (rowNum) => 
                  <TableRowDashboard 
                    rowNum={rowNum} 
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
        </div>
      </div>
      </div>
    )
  }
}