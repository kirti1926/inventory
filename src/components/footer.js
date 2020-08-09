import React from 'react';
import '../css/footer.css'
import { Navbar } from 'react-bootstrap';

class FooterComponent extends React.Component {
  render() {
    return <Navbar fixed="bottom" bg="dark" expand="lg" variant="dark" style={{display : "inline-block"}}>
        <Navbar.Brand style={{float:"right"}}>&copy; Inventory , 2020</Navbar.Brand>
    </Navbar>
  }
}

export default FooterComponent;