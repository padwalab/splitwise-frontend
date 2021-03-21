import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Expense from "./expense";

class AllExpenses extends Component {
  state = {
    expenses: [],
    payments: [],
  };
  componentDidMount() {
    fetch(`http://localhost:8000/api/groups/${this.props.currentUser.id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        result.forEach((group) => {
          this.setState({
            expenses: [
              ...this.state.expenses,
              ...group.expenseItems,
              ...group.payments,
            ],
          });
          console.log(this.state.expenses);
        });
      });
  }
  render() {
    const expenses = (
      <React.Fragment>
        {this.state.expenses
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((item) => (
            <Expense key={item.id} expenseItem={item} />
          ))}
      </React.Fragment>
    );
    const payments = (
      <React.Fragment>
        {this.state.payments
          .sort((a, b) => new Date(a.createdAt) - new Date(a.createdAt))
          .map((item) => (
            <Row>
              {item.payeeName} paid {item.payerName} ${item.amount}
            </Row>
          ))}
      </React.Fragment>
    );
    return (
      <Container fluid>
        {this.state.expenses.length < 1 ? (
          <h1 className="font-weight-light">No Recent Activity to display!!</h1>
        ) : (
          expenses
        )}
      </Container>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(AllExpenses);
