import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Expense from "./expense";
import Payment from "./payment";

class AllExpenses extends Component {
  state = {
    expenses: [],
    payments: [],
  };
  componentDidMount() {
    fetch(`http://localhost:8000/users/${this.props.currentUser.id}/groups`) // done
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        result.groups.forEach((group) => {
          this.setState({
            expenses: [
              ...this.state.expenses,
              ...group.expenses,
              // ...group.payments, // take care of payments
            ],
            payments: [...this.state.payments, ...group.payments],
          });
          console.log(this.state.expenses);
        });
      });
  }
  render() {
    const payments =
      this.state.payments.length > 0 ? (
        <React.Fragment>
          {[...this.state.payments, ...this.state.expenses]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((item) =>
              item.name ? (
                <Expense key={item.id} expenseItem={item} />
              ) : (
                <Payment key={item.id} paymentItem={item} />
              )
            )}
        </React.Fragment>
      ) : null;
    return (
      <Container fluid>
        {this.state.payments.length < 1 ? (
          <h1 className="font-weight-light">No Recent Activity to display!!</h1>
        ) : (
          payments
        )}
      </Container>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(AllExpenses);
