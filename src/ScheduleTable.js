import React from 'react'
import { Table } from 'reactstrap'
export default class ScheduleTable extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      list: props.list
    }
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