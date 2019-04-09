import React from 'react'
import './user-dashboard.css'
import { Link } from 'react-router-dom'
import { Button, Spinner, Modal, ModalHeader } from 'reactstrap'
import fire from 'firebase'
export default class UserDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      branch: props.match.params.branch,
      newSession: '',
      loading: true,
      modalOpen: false
    }
  }
  componentDidMount() {
    let db = fire.firestore()
    let newPresent = true
    let newSession = []
    let lengths = []
    db.collection('schedules').get().then(snapshot => {
      snapshot.forEach(session => {
          lengths.push(session.data().schedule[0][this.state.branch].list.length)
          newSession.push(session.data().session)
        }
      )
    }).then(() => {
      let ind = lengths.findIndex(item => item == 0)
      if (ind == -1)
        this.setState({ newSession: "", loading: false, modalOpen: true })
      else
        this.setState({ newSession: newSession[ind], loading: false, modalOpen: true })
    })
  }
  render() {
    if (this.state.loading) {
      return (
        <div
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Spinner />
        </div>
      )
    } else {
      return (
        <div className="user-dashboard-container">
          <div className="user-dashboard-header">
            <div className="user-dashboard-header-img">
              <img src={require('./logo.png')} alt="Logo" height="100px" width="100px" />
            </div>
            <div className="user-dashboard-header-text">
              <h1>Allotment System</h1>
            </div>
            <div className="user-dashboard-logout-button">
              <Button onClick={() => this.props.history.replace('/')}>
                Logout
            </Button>
            </div>
          </div>
          <div className="user-dashboard-links">
            <Link
              to={{
                pathname: "/fill-new/" + this.state.branch + '/' + this.state.newSession,
              }}
            >
              <div className="animation">
                <h2 className="user-dashboard-h2">[</h2>
                <h2 className="user-dashboard-h2">Fill Requistion List</h2>
                <h2 className="user-dashboard-h2">]</h2>
              </div>
            </Link>
            <Link to={"/view-previous-schedule/" + this.state.branch}>
              <div className="animation">
                <h2 className="user-dashboard-h2">[</h2>
                <h2 className="user-dashboard-h2">View Previous Schedules</h2>
                <h2 className="user-dashboard-h2">]</h2>
              </div>
            </Link>
            {/* <Link to="/update-list">
            <div className="animation">
              <h2 className="user-dashboard-h2">[</h2>
              <h2 className="user-dashboard-h2">Update List</h2>
              <h2 className="user-dashboard-h2">]</h2>
            </div>
          </Link> */}
          </div>
          <Modal isOpen={this.state.modalOpen}>
            <ModalHeader
              toggle={() => this.setState({ modalOpen: false })}
            >
              {
                this.state.newSession == "" ? "No New List Available" : "New List Present"
              }
            </ModalHeader>
          </Modal>
        </div>
      )
    }
  }
}