import React from 'react'
import { Button } from 'reactstrap'
import './login.css'
import fire from './firebase'
export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }
  login() {
    fire.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then((user) => {
      if (user.user.uid == 'Ssqgr2tyGkNBMphIXP0Yd6xj2qK2')
        this.props.history.push('/dashboard')
      else 
        this.props.history.push('/dashboard-user')
    }
    ).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }
  
  render() {
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
                onChange={(newValue) => this.setState({username: newValue.target.value})}/>
            </div>
            <div className="input-with-label">
              <label className="label">Password</label>
              <input 
                class="input-1" 
                type="password" 
                name="pass" 
                placeholder="Enter password"
                value={this.state.password}
                onChange={(newValue) => this.setState({ password: newValue.target.value })}/>
            </div>
          </div>
          <Button color="success" size="lg" onClick={() => this.login()}>
            <div style={{height: '100%', width: '100%', color: '#FFF'}}>
              LOGIN
            </div>
          </Button>
        </div>
      </div>
    )
  }
}