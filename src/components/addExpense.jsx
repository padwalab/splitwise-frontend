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
        <h2 className="border-bottom m-2">
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
