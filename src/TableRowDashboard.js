import React from 'react'

export default class TableRowDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rowNum: props.rowNum,
      firstSitting: 0,
      secondSitting: 0,
      total: 0,
      date: 0
    }
  }
  updateFirstSitting(newValue) {
    this.setState({firstSitting: newValue.target.value }, () => this.updateTotal())
  }
  updateSecondSitting(newValue) {
    this.setState({ secondSitting: newValue.target.value }, () => this.updateTotal())
  }
  updateTotal() {
    this.setState({
      total: parseInt(this.state.secondSitting, 10) + parseInt(this.state.firstSitting, 10)},
      () => this.props.updateTable(this.state)
    )
  }
  updateDate(newValue) {
    this.setState({date: newValue.target.value}, () => this.props.updateTable(this.state)) 
  }
  delete() {
    this.props.delete(this.state.rowNum)
  }
  render() {
    return (
      <tr ref={this.state.rowNum}>
        <th scope="row">
          <input type="date" value={this.state.date} onChange={(newValue) => this.updateDate(newValue)}/>
        </th>
        <td>
          <input value={this.state.firstSitting} onChange={(newValue) => this.updateFirstSitting(newValue)}/>
        </td>
        <td>
          <input value={this.state.secondSitting} onChange={(newValue) => this.updateSecondSitting(newValue)}/>
        </td>
        <td>
          <h5>
            {this.state.total}
          </h5>
        </td>
        <td>
          {/* <button>Delete</button> */}
          <img
            src="https://img.icons8.com/ios/50/000000/trash.png" 
            height="30px" 
            width="30px"
            onClick={() => this.delete()}/>
        </td>
      </tr>
    )
  }
}