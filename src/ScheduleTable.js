import React from 'react'
import { Table } from 'reactstrap'
export default class ScheduleTable extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      data: props.list,
      list: []
    }
  }
  componentDidMount() {
    let list = []
    for (const key in this.state.data) {
      if (this.state.data.hasOwnProperty(key)) {
        const element = this.state.data[key];
        if (element.req != 0 && element.list != undefined) {
          element.list.forEach(person => {
            var obj = {
              name: person.name,
              email: person.email,
              phone: person.phone,
              branch: key
            }
            list.push(obj)
          });
        }
      }
    }
    this.setState({ list })
  }
  render() {
    return (
      <Table bordered striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Branch</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.list.map((item) => 
            <tr>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.branch}</td>
            </tr>)
          }
        </tbody>
      </Table>
    )
  }
}