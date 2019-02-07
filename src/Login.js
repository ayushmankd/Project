import React from 'react'
import { Button } from 'reactstrap'
import './myStyles.css'
export default class Login extends React.Component {
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
              <input className="input-1" type="text" name="username" placeholder="Enter username" />
            </div>
            <div className="input-with-label">
              <label className="label">Password</label>
              <input class="input-1" type="password" name="pass" placeholder="Enter password"></input>
            </div>
          </div>
          <Button color="success" size="lg">
            LOGIN
          </Button>
        </div>
      </div>
    )
  }
}