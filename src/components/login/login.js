import React from 'react';
import LoginSignupHeader from '../header/login_signup_header';
import LoginSignupFooter from '../footer/login_signup_footer';
import { Container, Col, Row, Form, InputGroup, Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import cookie from 'react-cookies'

const LOGIN_SUCCESS = "login successful."

const LOGIN_ERROR = "Please try again later."

function validate(state) {

  const errors = [];


  if (state.email.length < 5) {
    errors.push("Email should be at least 5 charcters long");
  }
  if (state.email.split("").filter(x => x === "@").length !== 1) {
    errors.push("Email should contain a @");
  }
  if (state.email.indexOf(".") === -1) {
    errors.push("Email should contain at least one dot");
  }

  if (state.password.length === "") {

    errors.push("Password is req");
  }

  return errors;
}

class LoginComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      hiddenPassword: true,
      email: '',
      password: '',
      isLoginSuccess: false,
      errorMessage: false
    }
  }

  togglePassword = (e) => {
    this.setState({ hiddenPassword: !this.state.hiddenPassword });
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  submitLoginRequest = (event) => {
    event.preventDefault();
    var validateState = validate(this.state)
    event.target.className += " was-validated";

    if (validateState.length > 0)
      return
    else {
      Axios.get('http://localhost:3000/user')
        .then(response => {
         let count =  this.checkLoginUser(response.data);
         console.log(count)
        })
        .catch(err => {
          var errorResponse = '';
          if (err.response)
            errorResponse = err.response.data.message

          this.setState({
            isLoginError: true,
            isLoginSuccess: false,
            errorMessage: errorResponse
          })
        })
    }

  }

  checkLoginUser(loginData) {
    let count = 0
  loginData.filter(user => {

      for (var key in user) {
        if (key === 'email' && user[key] === this.state.email) {
          if (user.password === this.state.password) {
            cookie.save("user_name", user.name)
            cookie.save("user_id",user.id)
            count = count +1;
            this.setState({ isLoginSuccess: true })
          }

        }
      }
      return count;
    })
  }

  render() {
    const hideiconstyle = this.state.hiddenPassword ? { display: 'none' } : {};
    const showiconstyle = !this.state.hiddenPassword ? { display: 'none' } : {};
    if (this.state.isLoginSuccess)
      return <Redirect to={{
        pathname: "/home", state: {
          isLoggedIn: true
        }
      }} />
    return <React.Fragment>
      <LoginSignupHeader {...this.props}></LoginSignupHeader>
      <Container>
        <form className="login-form" onSubmit={this.submitLoginRequest} noValidate>
          <Row>
            <Col>
              <h3>
                Sign In
                    </h3><br />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formLoginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required value={this.state.email} onChange={this.handleEmailChange} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                         </Form.Text>
                <div className="invalid-feedback">Please provide a valid email</div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formLoginPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control placeholder="Password" type={this.state.hiddenPassword ? "password" : "text"} value={this.state.password} onChange={this.handlePasswordChange} required />
                  <InputGroup.Append>
                    <InputGroup.Text onClick={this.togglePassword} style={showiconstyle}><i className="fa fa-eye" aria-hidden="true"></i></InputGroup.Text>
                    <InputGroup.Text onClick={this.togglePassword} style={hideiconstyle}><i className="fa fa-eye-slash" aria-hidden="true"></i></InputGroup.Text>
                  </InputGroup.Append>
                  <div className="invalid-feedback">Password is requires</div>
                </InputGroup>

              </Form.Group>
            </Col>

          </Row>
          <br />
          <Row>
            <Col>
              <Alert variant="success" className={!this.state.isLoginSuccess ? 'hidden' : ''}>
                {this.state.loginMessage || LOGIN_SUCCESS}
              </Alert>
              <Alert variant="danger" className={!this.state.isLoginError ? 'hidden' : ''}>
                {this.state.errorMessage || LOGIN_ERROR}
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col >
              <Button variant="outline-dark" type="submit" className="btn-signin" size="lg" block>Sign In</Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Link to="/signup">New to Inventory? Create an account</Link>
            </Col>
          </Row>
        </form>
      </Container>




      <LoginSignupFooter></LoginSignupFooter>
    </React.Fragment>
  }
}

export default LoginComponent;