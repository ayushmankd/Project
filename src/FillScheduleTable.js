import React from 'react'
import { Table } from 'reactstrap'
export default class FillScheduleTable extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      list: [],
      required: props.list.required,
      tableIndex: props.indexTable
    }
  }
  componentDidMount() {
    let list = []
    for (let index = 0; index < this.state.required; index++) {
      var newObject = {
        name: this.props.list.list[index] == undefined ? '' : this.props.list.list[index].name,
        email: this.props.list.list[index] == undefined ? '' : this.props.list.list[index].email,
        phone: this.props.list.list[index] == undefined ? '' : this.props.list.list[index].phone
      }
      list.push(newObject)
    }
    this.setState({ list })
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
  render() {
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
                <input 
                  type="text" 
                  value={item.name} 
                  onChange={(newValue) => this.updateName(newValue.target.value, index)}/>
              </td>
              <td>
                <input 
                  type="email" 
                  value={item.email} 
                  onChange={(newValue) => this.updateEmail(newValue.target.value, index)}/>
              </td>
              <td>
                <input 
                  type="tel" 
                  value={item.phone} 
                  onChange={(newValue) => this.updatePhone(newValue.target.value, index)}/>
              </td>
            </tr>)
          }
        </tbody>
      </Table>
    )
  }
}