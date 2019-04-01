import React from 'react'
import { Button, Spinner } from 'reactstrap'
import './login.css'
import fire from './firebase'
import FillRequisition from './FillRequisition';
export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      loading: false,
      session: props.match.params.session,
      login: false,
      branch: props.match.params.branch,
      UID: [
        {
          for: 'CSEA',
          uid: 'RdPmyV7fIaeAu29ItSVaEorjqNa2'
        },
        {
          for: 'admin',
          uid: 'Ssqgr2tyGkNBMphIXP0Yd6xj2qK2'
        },
      ]
    }
  }
  login() {
    this.setState({ loading: true })
    fire.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then((user) => {
      this.setState({ loading: false })
      // console.log(user)
      if (this.state.branch == undefined) {
        let ind = this.state.UID.findIndex((item) => item.uid == user.user.uid)
        if (this.state.UID[ind].for == 'admin')
          this.props.history.push('/dashboard')
        else
          this.props.history.push('/dashboard-user/' + this.state.UID[ind].for)
      } else {
        let ind = this.state.UID.findIndex((item) => item.for == this.state.branch)
        if (this.state.UID[ind].uid == user.user.uid) {
          this.setState({ login: true })
        } else {
          console.log("G")
        }
      }      
      }
    ).catch(function(error) {
      this.setState({ loading: false })
      alert('Some Error Occured')
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }
  
  render() {
    if (this.state.loading) {
      return (
        <div style={{
          display: 'flex' ,
          height: '100vh',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Spinner />
        </div>
      )
    } else if (this.state.login) {
      return (
        <FillRequisition
          session={this.state.session}
          branch={this.state.branch}
        />
      )
    } else {
      return (
        <div className="container">
          <div className="login">
            <div className="login-title">
              <span className="login-title-text">
                Sign In
            </span>
            </div>
            <div className="login-form">
              <div className="input-with-label">
                <label className="label">Username</label>
                <input
                  className="input-1"
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={(newValue) => this.setState({ username: newValue.target.value })} />
              </div>
              <div className="input-with-label">
                <label className="label">Password</label>
                <input
                  class="input-1"
                  type="password"
                  name="pass"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={(newValue) => this.setState({ password: newValue.target.value })} />
              </div>
            </div>
            <Button color="success" size="lg" onClick={() => this.login()}>
              <div style={{ height: '100%', width: '100%', color: '#FFF' }}>
                LOGIN
            </div>
            </Button>
          </div>
        </div>
      )
    }
  }
}