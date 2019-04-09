import React from 'react'
import { Table, Spinner } from 'reactstrap'
import fire from './firebase'
import FillScheduleTableInputComponent from './FillScheduleTableInputComponent';
export default class FillScheduleTable extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      list: [],
      required: props.list.required,
      tableIndex: props.indexTable,
      facultiesList: [],
      fullList: [], 
      loading: true
    }
  }
  componentDidMount() {
    this.getFacultiesList()
    let list = []
    for (let index = 0; index < this.state.required; index++) {
      var newObject = {
        name: '',
        email: '',
        phone: ''
      }
      list.push(newObject)
    }
    this.setState({ list })
  }
  async getFacultiesList() {
    let db = fire.firestore()
    db.collection('teachers').doc(this.props.branch).get()
      .then((snapshot) => {
        let data = snapshot.data()
        let namesList = []
        data.list.forEach(item => namesList.push(item.name))
        this.setState({ facultiesList: namesList, fullList: data.list, loading: false })
      })
      .catch((err) => {
        console.log('Error getting documents', err);
        this.setState({ loading: false })
      });
  }
  updateEmail(email, index) {
    let list = [...this.state.list]
    list[index].email = email
    this.setState({ list }, () => this.props.updateList(list, this.state.tableIndex))
  }
  updateName(name, index) {
    let list = [...this.state.list]
    list[index].name = name
    this.setState({ list }, () => this.props.updateList(list, this.state.tableIndex))
  }
  updatePhone(phone, index) {
    let list = [...this.state.list]
    list[index].phone = phone
    this.setState({ list }, () => this.props.updateList(list, this.state.tableIndex))
  }
  update = (index, name) => {
    let list = [...this.state.list]
    let reqInd = this.state.facultiesList.findIndex(item => item == name)
    let newList = this.state.facultiesList
    newList.splice(reqInd, 1)
    list[index].phone = this.state.fullList[reqInd].phone
    list[index].email = this.state.fullList[reqInd].email
    list[index].name = name
    this.setState({ list, facultiesList: newList }, () => this.props.updateList(list, this.state.tableIndex))
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
        <Table bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.list.map((item, index) =>
                <tr>
                  <td>
                    <FillScheduleTableInputComponent
                      suggestions={this.state.facultiesList}
                      update={this.update}
                      index={index}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={item.email}
                      onChange={(newValue) => this.updateEmail(newValue.target.value, index)} />
                  </td>
                  <td>
                    <input
                      type="tel"
                      value={item.phone}
                      onChange={(newValue) => this.updatePhone(newValue.target.value, index)} />
                  </td>
                </tr>)
            }
          </tbody>
        </Table>
      )
    }
  }
}