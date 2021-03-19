import axios from "axios";
import React, { Component } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";

class Invitation extends Component {
  state = {
    groupId: this.props.groupId,
    userId: this.props.currentUser.id,
    groupName: "",
  };
  componentDidMount() {
    axios
      .get(`http://localhost:8000/api/group/${this.props.groupId}`)
      .then((result) => this.setState({ groupName: result.data.name }));
  }
  handleAcceptInvitation = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/api/groups/${this.props.groupId}/accept`, {
        userId: this.props.currentUser.id,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("invitation accepted");
        } else {
          console.log("Invite accept failed");
        }
      });
  };
  render() {
    return (
      <Container>
        Invitition for {this.props.currentUser.id}
        <Row className="border-bottom m-2">
          <Col xs={8}>{this.state.groupName}</Col>
          <Col>
            <Button onClick={(e) => this.handleAcceptInvitation(e)}></Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateTopProps = (state) => state;
export default connect(mapStateTopProps)(Invitation);
