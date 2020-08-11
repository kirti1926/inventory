import React from 'react';
import { Form, Row, Col, Container, InputGroup, Button, Alert } from 'react-bootstrap';
import Axios from 'axios';
import cookie from 'react-cookies'
import { Redirect } from 'react-router-dom';
import LoginSignupHeader from '../header/login_signup_header';
import LoginSignupFooter from '../footer/login_signup_footer';

const SIGNUP_SUCCESS = "Signup successful."

const SIGNUP_ERROR = "Please try again later."

function validate(state) {
    const errors = [];

    if (state.name === "") {

        errors.push("Name is required")
    }

    if (state.mobile === "") {

        errors.push("Mobile Number is required")
    }

    if (state.mobile.length !== 10) {
        errors.push("length must be 10")
    }
    if (state.email.length < 5) {

        errors.push("Email should be at least 5 charcters long");
    }
    if (state.email.split("").filter(x => x === "@").length !== 1) {

        errors.push("Email should contain a @");
    }
    if (state.email.indexOf(".") === -1) {

        errors.push("Email should contain at least one dot");
    }

    if (state.password === "") {

        errors.push("Password is required");
    }

    return errors;
}

class SignupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            mobile: '',
            isHiddenPassword: true,
            password: '',
            isSignupSuccess: false,
            isSignupError: false,
            regexp: /^[0-9\b]+$/,
            nameerror : '',
            mobileerror : ''
        }
    }

    handleEmailChange = (eve) => {
        this.setState({ email: eve.target.value });
    }
    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }
    handleNameChange = (e) => {
        if (e.target.value.match("^[A-Za-z]*$") != null) {
            this.setState({ nameerror: '' })
            this.setState({ name: e.target.value })
        }
        else {
            this.setState({ nameerror: 'Enter a valid firstname' })
        }

    }
    handleDobChange = (e) => {
        this.setState({ dob: e.target.value })
    }
    handleMobileChange = (event) => {
        if (event.target.value === "" || this.state.regexp.test(event.target.value)) {
            this.setState({ mobileerror: '' })
            this.setState({ mobile: event.target.value })
        } else {
            this.setState({ mobileerror: 'Enter numbers only' })
        }
    }
    togglePassword = (e) => {
        this.setState({ isHiddenPassword: !this.state.isHiddenPassword });
    }

    submitSignUpRequest = (event) => {
        event.preventDefault();
        var validateState = validate(this.state)
        event.target.className += " was-validated";
        if (validateState.length > 0)
            return
        else {
            var requestBody = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                mobile: this.state.mobile,
                inventory_name: this.state.inventory_name
            }

            Axios.post('http://localhost:3000/user', requestBody)
                .then(response => {
                    if (response.status === 201) {
                        this.setState({
                            isSignupSuccess: true,
                            isSignupError: false,
                            signupMessage: response.statusText
                        })
                        cookie.save('user_name', this.state.name)
                    }
                })
                .catch(err => {
                    var errorResponse = '';
                    if (err.response)
                        errorResponse = err.response.data.message
                    else
                        errorResponse = SIGNUP_ERROR

                    this.setState({
                        isSignupError: true,
                        isSignupSuccess: false,
                        errorMessage: errorResponse
                    })
                })
        }
    }

    render() {
        const hideiconstyle = this.state.isHiddenPassword ? { display: 'none' } : {};
        const showiconstyle = !this.state.isHiddenPassword ? { display: 'none' } : {};

        if (this.state.isSignupSuccess)
            return <Redirect to={{
                pathname: "/home", state: {
                    isLoggedIn: true
                }
            }} />
        return <React.Fragment>
            <LoginSignupHeader></LoginSignupHeader>
            <Container>
                <form className="signup-form" onSubmit={this.submitSignUpRequest} noValidate>
                    <Row>
                        <Col>
                            <h3>Sign Up</h3><br />
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                            <Form.Group controlId="formSignUpFirstName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" onChange={this.handleNameChange} required />
                                <div className="invalid-feedback">Please provide Name</div>
                                <div className={this.state.nameerror !== '' ? "invalid-feedback" : "hidden"}>{this.state.nameerror}</div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formSignUpEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmailChange} required />
                                <div className="invalid-feedback">Please provide a valid email</div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formSignUpPassword">
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control placeholder="Password" type={this.state.isHiddenPassword ? "password" : "text"} value={this.state.password} onChange={this.handlePasswordChange} required />
                                    <InputGroup.Append>
                                        <InputGroup.Text onClick={this.togglePassword} style={showiconstyle}><i className="fa fa-eye" aria-hidden="true"></i></InputGroup.Text>
                                        <InputGroup.Text onClick={this.togglePassword} style={hideiconstyle}><i className="fa fa-eye-slash" aria-hidden="true"></i></InputGroup.Text>
                                    </InputGroup.Append>
                                    <div className="invalid-feedback">Please enter password</div>
                                </InputGroup>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formSignUpMobile">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control placeholder="Contact Number" type="text" minLength="10" value={this.state.mobile} onChange={this.handleMobileChange} required />
                                <div className="invalid-feedback">Please enter your contact number</div>
                                <div className={this.state.mobileerror !== '' ? "invalid-feedback" : "hidden"}>{this.state.mobileerror}</div>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <Alert variant="success" className={!this.state.isSignupSuccess ? 'hidden' : ''}>
                                {this.state.isSignupSuccess || SIGNUP_SUCCESS}
                            </Alert>
                            <Alert variant="danger" className={!this.state.isSignupError ? 'hidden' : ''}>
                                {this.state.errorMessage || SIGNUP_ERROR}
                            </Alert>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <Button variant="outline-dark" type="submit" className="btn-signup" size="lg" block>Sign Up</Button>
                        </Col>
                    </Row>
                </form>
            </Container>
            <LoginSignupFooter></LoginSignupFooter>
        </React.Fragment>
    }
}

export default SignupComponent;