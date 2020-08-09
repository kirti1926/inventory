import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/login_signup_header.css'

class LoginSignupHeader extends React.Component {
    state = {}
    render() {
        return <div>
            <Navbar>
                <Navbar.Brand ><span className="icon-header"><i className="fa fa-tags" aria-hidden="true"></i></span> Inventory</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Link className="login-link" to="/login">Login</Link>
                </Navbar.Collapse>
            </Navbar>
            <hr></hr>
        </div>
    }
}

export default LoginSignupHeader;