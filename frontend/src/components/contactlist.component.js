import React, { Component } from 'react';
import axios from 'axios';
import {Table} from 'react-materialize';
import AddContact from './addcontact.component'
import Contact from './contact.component'


export default class ContactList extends Component{

  constructor(props){
    super(props);
    this.state = { contacts:[]}
  }

  componentDidMount(){
    axios.get('http://localhost:5000/contacts/')
    .then(response => {
      const contacts = response.data
      this.setState({ contacts });
      console.log(contacts);
    })
    .catch((err) => {
      console.log(err);
    })
  }


render(){
  return(
<Table>
<thead>
  <tr>
    <th data-field="fullname">
      Name
    </th>
    <th data-field="email">
      Email
    </th>
    <th data-field="address">
      Address
    </th>
    <th data-field="phones">
      Phones
    </th>
    <th data-field="settings">
      Actions
    </th>
  </tr>
</thead>
<tbody>
  {this.state.contacts.map(contact => <Contact contact={contact} id={contact['_id']}></Contact>
      )}         
  <AddContact></AddContact>
</tbody>
</Table>
  );
}

}