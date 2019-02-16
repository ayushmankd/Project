import React from 'react'
import { Table } from 'reactstrap'
export default class FillScheduleTable extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      list: [],
      required: props.list.required
    }
  }
  componentDidMount() {
    let list = []
    for (let index = 0; index < this.state.required; index++) {
      list.push(index)
    }
    this.setState({ list })
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
            this.state.list.map((item) => 
            <tr>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
              <td>
                <input />
              </td>
            </tr>)
          }
        </tbody>
      </Table>
    )
  }
}