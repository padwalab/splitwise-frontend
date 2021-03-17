import React, { Component } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { updateUserProfile } from "../redux/actions/action-helper";
class Profile extends Component {
  state = {
    name: this.props.currentUser.name,
    email: this.props.currentUser.email,
    password: this.props.currentUser.password,
    // new_password: "",
    phone: this.props.currentUser.phone,
    default_currency: this.props.currentUser.default_currency,
    time_zone: this.props.currentUser.time_zome,
    language: this.props.currentUser.language,
  };
  fileInput = React.createRef();
  addFile = (e) => {
    console.log(e.target.value);
  };
  handleName = (name) => {
    this.setState({ name });
  };
  handleEmail = (email) => {
    this.setState({ email });
  };
  handlePhone = (phone) => {
    this.setState({ phone });
  };
  handlePassword = (password) => {
    this.setState({ password });
  };
  //   handleNewPassword = (new_password) => {
  //     this.setState({ new_password });
  //   };
  handleCurrency = (default_currency) => {
    this.setState({ default_currency });
  };
  handleZone = (time_zone) => {
    this.setState({ time_zone });
  };
  handleLanguage = (language) => {
    this.setState({ language });
  };
  handleUpdateProfile = (e) => {
    e.preventDefault();
    this.props.updateUserProfile(this.state);
    // this.setState({
    //   name: this.props.currentUser.name,
    //   email: this.props.currentUser.email,
    //   password: this.props.currentUser.password,
    //   phone_number: this.props.currentUser.phone_number,
    //   default_currency: this.props.currentUser.default_currency,
    //   time_zone: this.props.currentUser.time_zone,
    // });
  };
  render() {
    let profile = (
      <React.Fragment>
        <h1>Your Account</h1>
        <Form onSubmit={(e) => this.handleUpdateProfile(e)}>
          <Row className="border-bottom m-2">
            <Col className="m-2">
              <Row className="m-2">
                <img
                  src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-blue45-200px.png"
                  alt="ProfilePhotoofUser"
                />
              </Row>
              <Row className="m-2">Change your avatar</Row>
              <Row className="m-2">
                <Form.Control
                  type="file"
                  accept=".png"
                  onChange={(e) => {
                    e.preventDefault();
                    this.addfile(e.target.value);
                  }}
                />
              </Row>
            </Col>
            <Col>
              <Row className="m-2">Your name</Row>
              <Row className="m-2">
                <Form.Control
                  type="text"
                  key="name"
                  placeholder={this.state.name}
                  onChange={(e) => this.handleName(e.target.value)}
                />
              </Row>
              <Row></Row>
              <Row className="m-2">Your email address</Row>
              <Row className="m-2">
                <Form.Control
                  key="email"
                  type="text"
                  placeholder={this.state.email}
                  onChange={(e) => this.handleEmail(e.target.value)}
                />
              </Row>
              <Row></Row>
              <Row className="m-2">Your Phone Number</Row>
              <Row className="m-2">
                <Form.Control
                  key="phone"
                  type="text"
                  placeholder={this.state.phone}
                  onChange={(e) => this.handlePhone(e.target.value)}
                />
              </Row>
              <Row></Row>
              {/* <Row>Your password</Row>
              <Row>
                <Form.Control
                  key="password"
                  type="password"
                  placeholder={this.state.password}
                  onChange={(e) => this.handlePassword(e.target.value)}
                />
                <Form.Control
                  key="newpassword"
                  type="password"
                  placeholder={this.state.new_password}
                  onChange={(e) => this.handleNewPassword(e.target.value)}
                />
              </Row> */}
            </Col>
            <Col>
              <Row className="m-2">Your default currency</Row>
              <Row className="m-2">
                <select
                  value={this.state.default_currency}
                  onChange={(e) => this.handleCurrency(e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                </select>
              </Row>
              <Row className="m-2">Your time zone</Row>
              <Row className="m-2">
                <select
                  value={this.state.time_zome}
                  onChange={(e) => this.handleZone(e.target.value)}
                >
                  <option value="PT">PT</option>
                  <option value="ET">ET</option>
                </select>
              </Row>
              <Row className="m-2">Language</Row>
              <Row className="m-2">
                <select
                  value={this.state.language}
                  onChange={(e) => this.handleLanguage(e.target.value)}
                >
                  <option value="ENG">English</option>
                  <option value="HIN">HINDI</option>
                </select>
              </Row>
            </Col>
          </Row>
          <Row>
            <Button className="mr-sm-2" type="submit">
              SAVE
            </Button>
          </Row>
        </Form>
      </React.Fragment>
    );
    return (
      <Container fluid className="w-75">
        {this.props.isLoggedIn ? profile : <Redirect to="/login" />}
      </Container>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { updateUserProfile })(Profile);
