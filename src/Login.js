import React from 'react'
import { Button, Spinner, Input, Modal, ModalBody, ModalHeader } from 'reactstrap'
import './login.css'
import fire from './firebase'
import FillRequisition from './FillRequisition';
import arr from './loginData'
export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'admin@igitexam.in',
      password: '',
      loading: false,
      session: props.match.params.session,
      login: false,
      branch: props.match.params.branch,
      UID: arr,
      modalOpen: false,
      header: '',
      text: ''
    }
  }
  login() {
    this.setState({ loading: true })
    fire.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then((user) => {
      this.setState({ loading: false })
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
    ).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/wrong-password") 
        this.setState({ 
          loading: false, 
          modalOpen: true, 
          header: "Incorrect Passoword", 
          text: "Please Check your Password" 
        })
      else
        this.setState({
          loading: false,
          modalOpen: true,
          header: "Something is Wrong",
          text: "Please try again later"
        })
    });
  }
  selectUsername(val) {
    let ind = this.state.UID.findIndex(item => item.for === val)
    this.setState({ username: this.state.UID[ind].username})
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
                <Input 
                  type="select" 
                  className="input-1" 
                  name="username" 
                  id="SelectUser"
                  onChange = {(val) => this.selectUsername(val.target.value)}
                >
                  {
                    this.state.UID.map(
                      user => 
                        <option>
                          {user.for}
                        </option>
                      )
                  }
                </Input>
              </div>
              <div className="input-with-label">
                <label className="label">Password</label>
                <Input
                  className="input-1"
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
          <Modal isOpen={this.state.modalOpen}>
            <ModalHeader
              toggle={() => this.setState({ modalOpen: false})}
            >
              {this.state.header}
            </ModalHeader>
            <ModalBody>
              {this.state.text}
            </ModalBody>
          </Modal>
        </div>
      )
    }
  }
}