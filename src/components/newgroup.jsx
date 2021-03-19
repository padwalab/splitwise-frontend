import React, { Component } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
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
      .post("http://localhost:8000/api/groups", { name: this.state.groupName })
      .then((groupres) => {
        console.log("repsonse data: ", groupres.data);
        if (groupres.status === 201) {
          this.state.members.forEach((member) =>
            axios
              .get(`http://localhost:8000/api/users/${member.email}`)
              .then((memberres) => {
                if (memberres.status === 200) {
                  console.log(memberres.data);
                  axios
                    .post(
                      `http://localhost:8000/api/groups/${groupres.data.id}/add`,
                      { userId: memberres.data.id }
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
    axios
      .get(
        `http://localhost:8000/api/users/get/${this.props.currentUser.email}`
      )
      .then((user) => this.props.updateUser({ ...user.data }));
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
        {this.props.isLoggedIn ? createGroupForm : <Redirect to="/login" />}
      </Container>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { createGroup, updateUser })(NewGroup);
