import React, { Component } from 'react';
import axios from 'axios';
import {Button, Icon, TextInput} from 'react-materialize';
import M from 'materialize-css'



export default class ContactList extends Component{

  constructor(props) { 
    super(props);

    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangePhones = this.onChangePhones.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      fullname: '',
      email:'',
      address: '',
      phones:''
    }
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


  onSubmit(e) {
    e.preventDefault();

    const contact = {
      fullname: this.state.fullname,
      email: this.state.email,
      address: this.state.address,
      phones: this.state.phones
    }

  
    if(this.state.fullname !== "" && this.state.email !== ""){
      if(Number(this.state.phones) == null){
        M.toast({
          html: 'Phones must be number!'
        })
      }else{

        console.log("/add/" + contact.fullname + " " );
        
        axios.post('http://localhost:5000/contacts/add', contact)
        .then(res => console.log(res.data));
        
        window.location = '/';
      }
    }else{
      M.toast({
        html: 'Fullname and email are required!'
      })
    }

    
  }




render(){
  return(
  <tr className="addnew">
     
    <td>
    <TextInput
        required
        type='text'
        id="fullname"
        label="Full Name"
        value={this.state.fullname}
        onChange={this.onChangeFullname}
      />
    </td>
    <td>
    <TextInput
        required
        type='text'
        id="email"
        label="Email"
        email='true'
        validate
        value={this.state.email}
        onChange={this.onChangeEmail}
      />
    </td>
    <td>
    <TextInput
        type='text'
        id="address"
        label="Address"
        value={this.state.address}
        onChange={this.onChangeAddress}
      />
    </td>
    <td>
      <TextInput
      type='number'
        id="phones"
        label="Phones"
        value={this.state.phones}
        onChange={this.onChangePhones}
      />
    </td>
    <td>
     <Button
        node="button"
        style={{
          marginRight: '5px'
        }}
        waves="light"
        onClick={this.onSubmit}
      >
        <Icon center>
          add_circle
        </Icon>
      </Button>
    </td>
    
  </tr>

  );
}

}