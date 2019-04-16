import React from 'react'
import './view-list.css'
import fire from './firebase'
import {
  Button, Table, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup,
  Label, Input, Spinner
} from 'reactstrap'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
export default class UpdateListBranch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      filteredList: [],
      modalNew: false,
      branches: [],
      newName: '',
      newBranch: '',
      newPhone: '',
      newEmail: '',
      DBlist: {},
      editModal: false,
      editIndex: '',
      currentBranch: props.match.params.branch,
      loading: true
    }
  }
  componentDidMount() {
    this.getData()
  }
  getData() {
    let list = []
    let branches = []
    let DBlist = {}
    let db = fire.firestore()
    db.collection('teachers').doc(this.state.currentBranch).get()
      .then(snapshot => {
          let data = snapshot.data()
          Object.defineProperty(DBlist, snapshot.id, {
            value: data.list,
            enumerable: true,
            writable: true
          })
          data.list.forEach((item, index) => {
            var obj = {
              Name: item.name,
              Branch: snapshot.id,
              Email: item.email,
              Phone: item.phone,
              currInd: index
            }
            branches.push(snapshot.id)
            list.push(obj)
          });
        return list
      }).then(list => {
        branches = [...new Set(branches.map(item => item))]
        console.log(branches)
        this.setState({ list, branches, DBlist, filteredList: list, loading: false })
      })
      .catch(err => {
        console.log('Error getting documents', err);
        this.setState({ loading: false })
      });
  }
  edit(item, index) {
    this.setState({
      newName: item.Name,
      newEmail: item.Email,
      newPhone: item.Phone,
      newBranch: item.Branch,
      editIndex: item.currInd,
      modalNew: true,
      editModal: true,
    })
  }
  update() {
    this.setState({ loading: true })
    let db = fire.firestore()
    let newList = this.state.DBlist[this.state.newBranch]
    newList[this.state.editIndex] = {
      name: this.state.newName,
      email: this.state.newEmail,
      phone: this.state.newPhone
    }
    db.collection('teachers').doc(this.state.newBranch).set({
      list: newList,
      // filteredList: newList
    }).then(() => {
      this.setState({
        newName: '',
        newEmail: '',
        newPhone: '',
        newBranch: '',
        editIndex: '',
        modalNew: false,
        editModal: false
      })
      this.getData()
    })
  }
  delete() {
    this.setState({ loading: true })
    let db = fire.firestore()
    let newList = this.state.DBlist[this.state.newBranch]
    newList.splice(this.state.editIndex, 1)
    db.collection('teachers').doc(this.state.newBranch).set({
      list: newList,
      // filteredList: newList
    }).then(() => {
      this.setState({
        newName: '',
        newEmail: '',
        newPhone: '',
        newBranch: '',
        editIndex: '',
        modalNew: false,
        editModal: false
      })
      this.getData()
    })
  }
  addNew() {
    this.setState({ loading: true })
    let db = fire.firestore()
    if (this.state.DBlist[this.state.newBranch] == undefined)
      var appendList = []
    else
      var appendList = this.state.DBlist[this.state.newBranch]
    db.collection('teachers').doc(this.state.newBranch).set({
      list: [...appendList, {
        email: this.state.newEmail,
        name: this.state.newName,
        phone: this.state.newPhone
      }]
    }, {
        merge: true,
      }).then(() => {
        this.setState({
          newName: '',
          newEmail: '',
          newPhone: '',
          newBranch: '',
          editIndex: '',
          modalNew: false,
          editModal: false
        })
        this.getData()
      })
  }
  changeBranch(newBranch) {
    this.setState({ newBranch })
  }
  changeEmail(newEmail) {
    this.setState({ newEmail })
  }
  changeName(newName) {
    this.setState({ newName })
  }
  changePhone(newPhone) {
    this.setState({ newPhone })
  }
  openNewModal() {
    this.setState({ modalNew: true })
  }
  filterByBranch(index) {
    let filteredList = this.state.list
    let currentBranch = ''
    if (index != 0)
      currentBranch = this.state.branches[index - 1]
    if (index != 0)
      filteredList = filteredList.filter(
        item => item.Branch == this.state.branches[index - 1]
      )
    this.setState({ filteredList, currentBranch })
  }
  closeModal() {
    this.setState({
      newName: '',
      newEmail: '',
      newPhone: '',
      newBranch: '',
      editIndex: '',
      modalNew: false,
      editModal: false
    })
  }
  genratePdf() {
    const doc = new jsPDF();
    let arr = []
    this.state.filteredList.forEach((item, index) => {
      let temp = []
      temp.push((index + 1).toString())
      temp.push(item.Name.toString())
      temp.push(item.Phone.toString())
      temp.push(item.Email.toString())
      temp.push(item.Branch.toString())
      arr.push(temp)
    })
    doc.autoTable({
      head: [['Sl No.', 'Name', 'Phone', 'Email', 'Branch']],
      body: arr
    });
    doc.save('Faculty-List' + this.state.currentBranch + '.pdf');
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
        <div className="view-list-container">
          <header className="view-list-header">
            <div className="header-back">
              <Button
                color="primary"
                onClick={() => this.props.history.goBack()}
              >
                Back
            </Button>
            </div>
          </header>
          <div className="view-list-body">
            <div className="table-head">
              <div className="header-back">
                <Button
                  className="add-new-button"
                  color="primary"
                  onClick={() => this.genratePdf()}
                >
                  Download List
              </Button>
                <Button
                  className="add-new-button"
                  color="primary"
                  onClick={() => this.openNewModal()}
                >
                  Add New
              </Button>
                <FormGroup>
                  <Input
                    type="select"
                    onChange={newValue => this.filterByBranch(newValue.target.value)}
                  >
                    <option value={0}>Filter By</option>
                    {
                      this.state.branches.map((item, index) =>
                        <option value={index + 1}>
                          {item.toString()}
                        </option>
                      )
                    }
                  </Input>
                </FormGroup>
              </div>
            </div>
            <Table bordered size="sm" striped id="myTable">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Branch</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.filteredList.map((item, index) =>
                  <tr>
                    <td>
                      {index + 1}
                    </td>
                    <td>
                      {item.Name}
                    </td>
                    <td>
                      {item.Phone}
                    </td>
                    <td>
                      {item.Email}
                    </td>
                    <td>
                      {item.Branch}
                    </td>
                    <td onClick={() => this.edit(item, index)}>
                      <img
                        src="https://img.icons8.com/ios/50/000000/edit-row.png"
                        height="20px"
                        width="20px"
                        style={{
                          marginRight: '10px'
                        }}
                      />
                      Edit
                  </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <Modal isOpen={this.state.modalNew}>
            <ModalHeader
              toggle={() => this.closeModal()}
            >
              New
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name of the Person"
                    value={this.state.newName}
                    onChange={(newName) => this.changeName(newName.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email of the Person"
                    value={this.state.newEmail}
                    onChange={(newEmail) => this.changeEmail(newEmail.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="phone">Phone Number</Label>
                  <Input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="Phone Number of the Person"
                    value={this.state.newPhone}
                    onChange={(newPhone) => this.changePhone(newPhone.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="branch">Branch</Label>
                  <Input
                    type="text"
                    name="branch"
                    disabled={this.state.editModal}
                    id="branch"
                    list="branches"
                    placeholder="Branch"
                    value={this.state.newBranch}
                    onChange={(newBranch) => this.changeBranch(newBranch.target.value)}
                  />
                  <datalist id='branches'>
                    {
                      this.state.branches.map((item, index) =>
                        <option
                          key={index.toString()}
                        >
                          {item}
                        </option>
                      )
                    }
                  </datalist>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              {
                this.state.editModal
                  ?
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-around',
                      alignItems: 'center'
                    }}
                  >
                    <Button color="primary" onClick={() => this.update()}>Update</Button>
                    <Button color="danger" onClick={() => this.delete()}>Delete</Button>
                  </div>
                  :
                  <Button color="primary" onClick={() => this.addNew()}>Add New</Button>
              }
            </ModalFooter>
          </Modal>
        </div>
      )
    }
  }
}