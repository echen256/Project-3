import React, { Component } from 'react';
import Jumbotron from '../../components/Jumbotron';
import { H1, H2 } from '../../components/Headings';
import { Container, Row, Col } from '../../components/Grid';
import { Form, Input, FormGroup, Label } from '../../components/Form';
import { Panel, PanelBody } from '../../components/Panel';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import './../../components/Login/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
    };
  }

  componentDidMount() {
    if (localStorage.getItem('jwtToken') !== null) {
      this.props.history.push('/');
    }
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const self = this;
    API.loginUser(username, password)
      .then(result => {
        localStorage.setItem('jwtToken', result.data.token);
        localStorage.setItem('user', username);
        self.props.updateLogin(self.props.parent);
        this.setState({ message: '' });
      })
      .then(() => {
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password not match' });
        }
      });
    this.setState({
      username: '',
      password: '',
      message: '',
    });
  };

  render() {
    const { username, password, message } = this.state;
    return (
      <Container fluid>
        <Row>
          <Col size="sm-10" offset="sm-1">
            <Jumbotron>
              <H1 className="text-center">Welcome to Best Seller Searcher!</H1>
              <hr style={{ width: '60%' }} />
            </Jumbotron>
            <Panel>
              <PanelBody>
                <Form className="form-signin" style={{ marginBottom: '30px' }}>
                  {message !== '' && (
                    <div className="alert alert-warning alert-dismissible" role="alert">
                      {message}
                    </div>
                  )}

                  <H2 className="form-signin-heading">Please sign in</H2>

                  <FormGroup>
                    <Label htmlFor="inputUsername" className="sr-only">
                      Username
                    </Label>
                    <Input
                      type="Username"
                      className="form-control"
                      placeholder="Username"
                      name="username"
                      value={username}
                      onChange={this.onChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="inputPassword" className="sr-only">
                      Password
                    </Label>
                    <Input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={this.onChange}
                      required
                    />
                  </FormGroup>

                  <button
                    disabled={!username || !password}
                    className="btn btn-lg btn-primary btn-block"
                    onClick={this.onSubmit}
                    type="info"
                  >
                    Login
                  </button>

                  <p>
                    Not a member?{' '}
                    <Link to="/register">
                      <span className="glyphicon glyphicon-plus-sign" aria-hidden="true" /> Register
                      here
                    </Link>
                  </p>
                </Form>
              </PanelBody>
            </Panel>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
