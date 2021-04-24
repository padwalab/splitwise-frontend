import React, { Component } from "react";
import { Button, Container, Form, Row, Col, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import axios from "axios";
import { createGroup, updateUser } from "../redux/actions/action-helper";
import { Typeahead } from "react-bootstrap-typeahead";

class NewGroup extends Component {
  state = {
    groupName: "",
    members: [
      {
        name: this.props.currentUser.name,
        email: this.props.currentUser.email,
      },
    ],
    success: false,
    warning: false,
  };
  userNames = [];
  selectedNames = [];
  componentDidMount() {
    fetch(`http://localhost:8000/api/userlist`)
      .then((userLists) => userLists.json())
      .then((userList) =>
        userList.forEach((user) => {
          this.userNames.push(user.name);
        })
      );
    console.log(this.userNames, this.user);
  }

  handleGroupName = (groupName) => {
    this.setState({ groupName });
  };
  handleUsers = (user) => {
    this.selectedNames = [...this.selectedNames, user];
    console.log(this.selectedNames);
  };

  handleCreateGroup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/groups", {
        //done
        name: this.state.groupName,
        userId: this.props.currentUser.id,
      })
      .then((groupres) => {
        console.log("repsonse data: ", groupres.data);
        if (groupres.status === 201) {
          this.state.members.forEach((member) =>
            axios
              .get(`http://localhost:8000/users/${member.email}/getId`) // this api is done
              .then((memberres) => {
                if (memberres.status === 200) {
                  console.log(memberres.data);
                  axios
                    .post(
                      `http://localhost:8000/users/${groupres.data.id}/invite`, // done
                      { email: memberres.data.email }
                    )
                    .then((res) => {
                      console.log(res);
                    });
                }
              })
          );
          this.props.createGroup({ ...groupres.data });
        }
      });
    // this v api is done
    axios
      .get(
        `http://localhost:8000/users/${this.props.currentUser.email}/details` // this is done
      )
      .then((user) => {
        this.setState({ success: true });
        this.props.updateUser({ ...user.data });
        <Redirect to="/home/dashboard" />;
      })
      .catch((error) => {
        this.setState({ warning: true });
      });
    console.log(this.state);
  };

  render() {
    let createGroupForm = (
      <Form onSubmit={(e) => this.handleCreateGroup(e)}>
        <Form.Label className="font-weight-bold mx-auto">
          START A NEW GROUP
        </Form.Label>
        <Form.Group>
          <Form.Label>
            <h3 className="font-weight-light">My group shall be called...</h3>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="The Breakfast Club"
            onChange={(e) => this.handleGroupName(e.target.value)}
            value={this.state.groupName}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>GROUP MEMBERS</Form.Label>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Name"
                defaultValue={this.props.currentUser.name}
                required
              ></Form.Control>
            </Col>
            <Col>
              <Form.Control
                type="email"
                placeholder="email"
                defaultValue={this.props.currentUser.email}
                required
              ></Form.Control>
            </Col>
          </Row>
          {/* <Row>
            <Col>
              <Typeahead
                id="basic-typeahead-single"
                labelKey="name"
                single
                onChange={(e) => this.handleUsers(e.target.value)}
                options={this.userNames}
                placeholder="Choose several Users..."
                // selected={multiSelections}
              />
            </Col>
          </Row> */}
        </Form.Group>
        <Button varient="primary" type="submit">
          Save
        </Button>
      </Form>
    );
    return (
      <Container fluid className="w-25">
        {this.state.warning ? (
          <Alert variant="danger">Failed to create group.</Alert>
        ) : null}
        {this.state.success ? (
          <Alert variant="success">Create group successfull.</Alert>
        ) : null}
        {this.props.isLoggedIn ? createGroupForm : <Redirect to="/login" />}
      </Container>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { createGroup, updateUser })(NewGroup);
