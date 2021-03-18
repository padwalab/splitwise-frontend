import axios from "axios";
import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

class AddExpense extends Component {
  state = {
    createdBy: this.props.currentUser.id,
    name: "",
    amount: 0,
    reciept: "",
  };
  handleSubmitExpense = (e) => {
    e.preventDefault();
    console.log("handling the add expesnse", this.props.currentUser.id);

    axios
      .post(`http://localhost:8000/api/groups/${this.props.groupId}/expense`, {
        ...this.state,
      })
      .then((res) => {
        if (res.status === 201) {
          console.log("add expense successfull");
          fetch(`http://localhost:8000/api/group/${this.props.groupId}/members`)
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              result.forEach((member) => {
                if (member.userId === this.props.currentUser.id) {
                  console.log(
                    "adding expense as: memberid: ",
                    member.userId,
                    " amount: ",
                    this.state.amount,
                    " share: ",
                    +(this.state.amount - this.state.amount / result.length)
                  );
                  axios
                    .put("http://localhost:8000/api/expenses/add_share", {
                      groupId: `${this.props.groupId}`,
                      userId: `${member.userId}`,
                      amount: +(
                        this.state.amount -
                        this.state.amount / result.length
                      ),
                    })
                    .then((result) => {
                      if (result.status === 200) {
                        console.log("add share successful", result);
                      }
                    });
                } else {
                  console.log(
                    "adding expense as: memberid: ",
                    member.userId,
                    " amount: ",
                    this.state.amount,
                    " share: ",
                    -(this.state.amount / result.length)
                  );
                  axios
                    .put("http://localhost:8000/api/expenses/add_share", {
                      groupId: `${this.props.groupId}`,
                      userId: `${member.userId}`,
                      amount: -+(this.state.amount / result.length),
                    })
                    .then((result) => {
                      if (result.status === 200) {
                        console.log("add share successful", result);
                      }
                    });
                }
              });
            });
        } else {
          console.log("add expense failed");
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
        <Form onSubmit={(e) => this.handleSubmitExpense(e)}>
          <Form.Group controlId="formExpenseName">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={this.state.name}
              onChange={(e) => this.handleDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="AmountPaid">
            <Form.Label>Amount Paid</Form.Label>
            <Form.Control
              type="number"
              placeholder="0.00"
              value={this.state.amount}
              onChange={(e) => this.handleAmount(e.target.value)}
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
