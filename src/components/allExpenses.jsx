import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import Expense from "./expense";

class AllExpenses extends Component {
  state = {
    expenses: [],
  };
  componentDidMount() {
    fetch(`http://localhost:8000/api/groups/${this.props.currentUser.id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        result.forEach((group) => {
          this.setState({
            expenses: [...this.state.expenses, ...group.expenseItems],
          });
          console.log(this.state.expenses);
        });
      });
    console.log(this.state.expenses);
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
    return <Container fluid>{expenses}</Container>;
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(AllExpenses);
