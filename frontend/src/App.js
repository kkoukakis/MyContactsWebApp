import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Row, Container} from "react-materialize";

import ContactList from './components/contactlist.component';



function App() {
  return (
    <Router>
      <Container>
      <Row>
      <h1 className="center">My Contacts</h1>
      </Row>
      <Row>
        <Route path="/" exact component={ContactList} />
      </Row>
      </Container>
    </Router>
  );
}

export default App;
