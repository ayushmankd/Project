import React from 'react'

export default class TableHeadingDashboard extends React.Component {
  render() {
    return (
      <thead>
        <tr>
          <th>Date</th>
          <th>1st Sitting</th>
          <th>2nd Sitting</th>
          <th>Total Students</th>
          <th></th>
        </tr>
      </thead>
    )
  }
}