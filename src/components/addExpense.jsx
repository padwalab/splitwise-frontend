import axios from "axios";
import React, { Component } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";

class AddExpense extends Component {
  state = {
    createdBy: this.props.currentUser.id,
    name: "",
    amount: 0,
    reciept: "",
    success: false,
    warning: false,
  };
  handleSubmitExpense = (e) => {
    e.preventDefault();
    console.log("handling the add expesnse", this.props.currentUser.id);

    axios
      .post(`http://localhost:8000/expense/${this.props.groupId}/add`, {
        //done
        ...this.state,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("add expense successfull");
          fetch(`http://localhost:8000/groups/${this.props.groupId}/members`) // done
            .then((res) => res.json())
            .then((result) => {
              console.log(result.members.length);
              result.members.forEach((member) => {
                if (member.member === this.props.currentUser.id) {
                  console.log(
                    "adding expense as: memberid: ",
                    member.id,
                    " User id: ",
                    member.member,
                    " amount: ",
                    this.state.amount,
                    " share: ",
                    +(
                      this.state.amount -
                      this.state.amount / result.members.length
                    )
                  );
                  let share = +(
                    this.state.amount -
                    this.state.amount / result.members.length
                  );
                  axios
                    .post(`http://localhost:8000/membership/${member.id}/add`, {
                      //done
                      // groupId: `${this.props.groupId}`,
                      // userId: `${member.userId}`,
                      share: share === 0 ? 0 : share,
                    })
                    .then((result) => {
                      if (result.status === 200) {
                        console.log("add share successful", result);
                      }
                    });
                } else {
                  console.log(
                    "adding expense as: memberid: ",
                    member.id,
                    " User id: ",
                    member.member,
                    " amount: ",
                    this.state.amount,
                    " share: ",
                    -(this.state.amount / result.members.length)
                  );
                  axios
                    .post(`http://localhost:8000/membership/${member.id}/add`, {
                      //done
                      share: -+(this.state.amount / result.members.length),
                    })
                    .then((result) => {
                      if (result.status === 200) {
                        this.setState({ success: true });
                      }
                    });
                }
              });
            });
        } else {
          console.log("add expense failed");
          this.setState({ warning: true });
        }
      });
  };
  handleDescription = (description) => {
    this.setState({ name: description });
  };
  handleAmount = (amount) => {
    this.setState({ amount });
  };
  render() {
    return (
      <Container className="w-75" fluid>
        <h2 className="font-weight-light border-bottom m-2">
          :::Add Expense::: {this.props.groupName.toUpperCase()}
        </h2>
        {this.state.warning ? (
          <Alert variant="danger">Failed to add expense.</Alert>
        ) : null}
        {this.state.success ? (
          <Alert variant="success">Add expense successfull.</Alert>
        ) : null}
        <Form onSubmit={(e) => this.handleSubmitExpense(e)}>
          <Form.Group controlId="formExpenseName">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={this.state.name}
              onChange={(e) => this.handleDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="AmountPaid">
            <Form.Label>Amount Paid</Form.Label>
            <Form.Control
              type="number"
              placeholder="0.00"
              value={this.state.amount}
              onChange={(e) => this.handleAmount(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Container>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(AddExpense);
