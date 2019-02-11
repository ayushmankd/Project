import React from 'react'
import { Button } from 'reactstrap'
import './login.css'
export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }
  login() {
    if(this.state.username == 'ayushmankd@gmail.com' && this.state.password == '12345678'){
      this.props.history.push('/dashboard')
    }
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