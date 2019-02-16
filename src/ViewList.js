import React from 'react'
import './view-list.css'
import fire from './firebase'
import { Button, Table } from 'reactstrap'
export default class ViewList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      edit: true,
      addNew: false
    }
  }
  componentDidMount() {
    let list = []
    let db = fire.firestore()
    db.collection('teacher_list').orderBy('Branch').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let data = doc.data()
          list.push(data)
        });
        return list
      }).then((list) => {
        this.setState({ list })
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  }
  addNew() {
    let list = [...this.state.list]
    list.push({
      Name: '',
      Email: '',
      Phone: '',
      Branch: '' 
    })
    this.setState({ list, edit: false, addNew: true })
  }
  updateBranch(newValue, index) {
    let list = [...this.state.list]
    list[index].Branch = newValue;
    this.setState({ list }) 
  }
  updateName(newValue, index) {
    let list = [...this.state.list]
    list[index].Name = newValue;
    this.setState({ list })
  }
  updateEmail(newValue, index) {
    let list = [...this.state.list]
    list[index].Email = newValue;
    this.setState({ list })
  }
  updatePhone(newValue, index) {
    let list = [...this.state.list]
    list[index].Phone = newValue;
    this.setState({ list })
  }
  async saveNew() {
    let db = fire.firestore()
    let newData = this.state.list[this.state.list.length - 1]
    var docRef = db.collection('teacher_list')
    .add({
      Branch: newData.Branch,
      Email: newData.Email,
      Name: newData.Name,
      Phone: newData.Phone
    })
    this.setState({ edit: true, addNew: false })
  }
  render() {
    return (
      <div className="view-list-container">
        <header className="view-list-header">
          <div className="header-back">
            <Button color="primary" onClick={() => this.props.history.goBack()}>Back</Button>
          </div>
        </header>
        <div className="view-list-body">
          <div className="table-head">
            <div className="header-back">
              <Button color="primary">Edit</Button>
            </div>
            <div className="header-back">
              {
                !this.state.addNew ? 
                  <Button color="primary" onClick={() => this.addNew()}>
                    Add New
                  </Button>
                : 
                  <Button color="primary" onClick={() => this.saveNew()}>
                    Save
                  </Button>
                }
            </div>
          </div>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Branch</th>
              </tr>
            </thead>
            <tbody>
              {this.state.list.map((item, index) =>
                <tr>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    <input 
                      value={item.Name} 
                      disabled={this.state.edit}
                      onChange={(value) => this.updateName(value.target.value, index)}/>
                  </td>
                  <td>
                    <input 
                      value={item.Phone} 
                      disabled={this.state.edit}
                      onChange={(value) => this.updatePhone(value.target.value, index)}
                    />
                  </td>
                  <td>
                    <input 
                      value={item.Email} 
                      disabled={this.state.edit}
                      onChange={(value) => this.updateEmail(value.target.value, index)}
                    />
                  </td>
                  <td>
                    <input 
                      value={item.Branch} 
                      disabled={this.state.edit}
                      onChange={(value) => this.updateBranch(value.target.value, index)}/>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}