import React from 'react'
import './view-list.css'
import fire from './firebase'
import {
  Button, Table,
} from 'reactstrap'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
export default class ViewPasswordList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  componentDidMount() {
    this.getData()
  }
  getData() {
    let db = fire.firestore()
    let list = []
    db.collection('passwords').get().then(snapshot => {
      snapshot.forEach(doc => list = doc.data().list)
    }).then(() => this.setState({ list }))
  }
  genratePdf() {
    let doc = jsPDF()
    doc.autoTable({
      html: '.table'
    })
    doc.save('Password List.pdf')
  }
  render() {
    return (
      <div className="view-list-container">
        <header className="view-list-header">
          <div className="header-back">
            <Button
              color="primary"
              onClick={() => this.props.history.goBack()}
            >
              Back
            </Button>
          </div>
        </header>
        <div className="view-list-body">
          <div className="table-head">
            <div className="header-back">
              <Button
                className="add-new-button"
                color="primary"
                onClick={() => this.genratePdf()}
              >
                Download List
              </Button>
            </div>
          </div>
          <Table className="table" bordered size="sm" striped id="myTable">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Department Name</th>
                <th>Username</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.list.map(
                  (entry, index) => 
                    <tr>
                      <td>{(index + 1).toString()}</td>
                      <td>{entry.branch}</td>
                      <td>{entry.username}</td>
                      <td>{entry.password}</td>
                    </tr>
                  )
              }
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}