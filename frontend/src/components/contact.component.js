import React, { Component } from 'react';
import axios from 'axios';
import {Row,Col, Button, Icon, Modal, TextInput} from 'react-materialize';
import M from 'materialize-css'



export default class ContactList extends Component{

  constructor(props) { 
    super(props);

    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhones = this.onChangePhones.bind(this);
    this.deleteContact = this.deleteContact.bind(this)
    this.editContact = this.editContact.bind(this)
    this.editContact = this.editContact.bind(this);

    this.state = {
        id : props.id,
        fullname : props.contact.fullname,
        email :  props.contact.email,
        address :  props.contact.address,
        phones :  props.contact.phones,
  };
  }

  onChangeFullname(e){
    this.setState({
      fullname: e.target.value
    })
  }
  onChangeEmail(e){
    this.setState({
      email: e.target.value
    })
  }
  onChangeAddress(e){
    this.setState({
      address: e.target.value
    })
  }
  onChangePhones(e){
    this.setState({
      phones: e.target.value
    })
  }



  deleteContact() {
      console.log(this.state.id)
      M.toast({
        html: 'Contact Deleted!'
      })
    axios.delete('http://localhost:5000/contacts/delete/'+this.state.id)
      .then(response => { window.location = "/";  } );
  }

editContact(){

    const contact = {
        address : this.state.address,
        phones : this.state.phones
    }

    M.toast({
        html: contact.address + " " + contact.phones + " id:"+this.state.id
      })

    axios.post('http://localhost:5000/contacts/update/'+this.state.id , contact)
      .then(response => { window.location = "/";  } );
}

render(){
  return(
    <tr>
    <td>
      {this.state.fullname}
    </td>
    <td>
    {this.state.email}
    </td>
    <td>
        <TextInput
        value={this.state.address}
        onChange={this.onChangeAddress}
        >
        </TextInput>
    </td>
    <td>
        <TextInput
        type="Number"
        data-length={10}
        value={this.state.phones}
        onChange={this.onChangePhones}
        >
        </TextInput>  
    </td>
    <td>
      <Col>
        <Row>
        <Modal
            actions={[
                <div>

              <Button flat modal="close" node="button" waves="green">CANCEL</Button>
              <Button  
              node="button" 
              style={{
                  marginRight: '5px',
                  backgroundColor: 'maroon'
                }}
                waves="light"
                onClick={this.deleteContact}>DELETE</Button>
                </div>
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header="Delete Contact"
            id="Modal-0"
            open={false}
            options={{
              dismissible: true,
              endingTop: '10%',
              inDuration: 250,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              opacity: 0.5,
              outDuration: 250,
              preventScrolling: true,
              startingTop: '4%'
            }}
            trigger={
            <Button node="button"   style={{
                marginRight: '5px',
                backgroundColor: 'maroon'
              }}
              waves="light">  
                <Icon center>
                delete_forever
                </Icon>
            </Button>}
            >
            <p>
                Are you sure you want to delete this contact?
            </p>
            </Modal>
        </Row>
          
        <Row>
          <Button
            node="button"
            style={{
              marginRight: '5px',
              backgroundColor: 'skyblue'
            }}
            waves="light"
            onClick={this.editContact}
          >
            <Icon center>
              build
            </Icon>
          </Button>
        </Row>
      </Col>
    </td>
  </tr>
  );
}

}


