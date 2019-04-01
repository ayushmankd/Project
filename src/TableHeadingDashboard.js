import React from 'react'

export default class TableHeadingDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timing1: props.timing1,
      timing2: props.timing2
    }
  }
  componentWillReceiveProps(newProps, prevProps) {
    this.setState({ timing1: newProps.timing1, timing2: newProps.timing2 })
  }
  render() {
    return (
      <thead>
        <tr>
          <th>Date</th>
          <th>
            Total Students {'\n'} 1st Sitting
            <div>
              {this.state.timing1}
            </div>
          </th>
          <th>
            Total Students {'\n'} 2nd Sitting
            <div>
              {this.state.timing2}
            </div>
          </th>
          <th></th>
        </tr>
      </thead>
    )
  }
}