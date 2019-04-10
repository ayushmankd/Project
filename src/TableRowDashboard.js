import React from 'react'
import { Popover, PopoverBody, PopoverHeader } from 'reactstrap'
export default class TableRowDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rowNum:         props.rowNum,
      firstSitting:   0,
      secondSitting:  0,
      date:           0,
      popoverOpenSitting1: false,
      popoverOpenSitting2: false
    }
  }
  updateFirstSitting(newValue) {
    if (parseInt(newValue.target.value, 10) == NaN)
      this.setState({ popoverOpenSitting1: true })
    else
      this.setState({ firstSitting: newValue.target.value }, () => this.props.updateTable(this.state))
  }
  updateSecondSitting(newValue) {
    if (parseInt(newValue.target.value, 10) == NaN)
      this.setState({ popoverOpenSitting2: true })
    else
      this.setState({ secondSitting: newValue.target.value }, () => this.props.updateTable(this.state))
  }
  updateDate(newValue) {
    let inputDate = newValue.target.value
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd
    if (today > inputDate) 
      alert("Input Date must not be from Previous Days") 
    this.setState({date: inputDate}, () => this.props.updateTable(this.state)) 
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
        <td id={"sitting1" + this.state.rowNum}>
          <input value={this.state.firstSitting} onChange={(newValue) => this.updateFirstSitting(newValue)}/>
        </td>
        <Popover 
          placement="bottom" 
          isOpen={this.state.popoverOpenSitting1} 
          target={"sitting1" + this.state.rowNum}  
        >
          <PopoverHeader>Invalid Data</PopoverHeader>
          <PopoverBody>Only Numeric Data is Accepted</PopoverBody>
        </Popover>
        <td id={"sitting2" + this.state.rowNum}>
          <input value={this.state.secondSitting} onChange={(newValue) => this.updateSecondSitting(newValue)}/>
        </td>
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpenSitting2}
          target={"sitting2" + this.state.rowNum}
        >
          <PopoverHeader>Invalid Data</PopoverHeader>
          <PopoverBody>Only Numeric Data is Accepted</PopoverBody>
        </Popover>
        <td>
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