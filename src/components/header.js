import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../css/header.css";
import cookie from 'react-cookies'

export class HeaderComponent extends React.Component {

    logout() {
        cookie.remove("user_name")
    }

    render() {
        return <Navbar fixed="top" bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="#home"><i className="fa fa-tags icon" aria-hidden="true"></i> Inventory</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Link className="link" to="/product_list">Products</Link>
                &nbsp;&nbsp;
                <Link className="link" to="/" onClick={this.logout}>Logout</Link>
            </Navbar.Collapse>
        </Navbar>

    }
}