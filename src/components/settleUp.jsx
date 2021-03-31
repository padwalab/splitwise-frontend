import axios from "axios";
import React, { Component } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";

class SettleUp extends Component {
  state = {
    member: "",
    balance: 0,
    success: false,
    warning: false,
  };
  userNames = [];
  componentDidMount() {
    fetch(`http://localhost:8000/api/group/${this.props.groupId}`)
      .then((userLists) => userLists.json())
      .then((userList) =>
        userList.users.forEach((user) => {
          this.userNames.push(user.email + "::" + user.name + "::" + user.id);
        })
      );
    axios
      .post(`http://localhost:8000/api/groups/userbalance`, {
        userId: this.props.currentUser.id,
        groupId: this.props.groupId,
      })
      .then((result) => this.setState({ balance: result.data.share }));
    console.log(this.userNames, this.state.balance);
  }

  handleSettleUp = (e) => {
    e.preventDefault();
    let memberId = this.state.member.split("::")[2];
    axios
      .post(`http://localhost:8000/api/groups/${this.props.groupId}/settleup`, {
        userId: this.props.currentUser.id,
        payeeName: this.props.currentUser.name,
        memberId: memberId,
        payerName: this.state.member.split("::")[1],
        amount: this.state.amount,
      })
      .then((result) => {
        if (result.status === 200) {
          this.setState({ success: true });
        }
      })
      .catch((error) => {
        this.setState({ warning: true });
      });
  };
  handleAmount = (amount) => {
    this.setState({ amount });
  };
  render() {
    return (
      <Container className="w-75" fluid>
        <h2 className="font-weight-light border-bottom m-2">
          :::Settle Up::: {this.props.groupName.toUpperCase()} You owe:
          {this.state.balance}
        </h2>
        {this.state.warning ? (
          <Alert variant="danger">Failed to settle up.</Alert>
        ) : null}
        {this.state.success ? (
          <Alert variant="success">Settle Up successfull.</Alert>
        ) : null}
        <Form onSubmit={(e) => this.handleSettleUp(e)}>
          <Form.Group controlId="formMemberName">
            <Form.Label>Choose a Member name</Form.Label>
            <Typeahead
              id="basic-typeahead-single"
              labelKey="name"
              single
              onChange={(e) => this.setState({ member: e[0] })}
              options={this.userNames}
              placeholder="Choose several Users..."
              //   selected={this.state.name}
            />
            <Form.Label>Amount to settle up</Form.Label>
            <Form.Control
              type="number"
              placeholder="amount"
              value={this.state.amount}
              onChange={(e) => this.handleAmount(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            SettleUp
          </Button>
        </Form>
      </Container>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(SettleUp);
