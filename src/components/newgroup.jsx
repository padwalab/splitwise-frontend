import React, { Component } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import axios from "axios";
import { createGroup } from "../redux/actions/action-helper";

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

  handleGroupName = (groupName) => {
    this.setState({ groupName });
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
export default connect(mapStateToProps, { createGroup })(NewGroup);
