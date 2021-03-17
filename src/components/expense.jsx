import React, { Component } from "react";
import { Col, Row, Image, Container } from "react-bootstrap";

class Expense extends Component {
  state = {
    name: "NA",
  };

  componentDidMount() {
    if (this.props.expenseItem.createdBy !== null) {
      fetch(
        `http://localhost:8000/api/user/${this.props.expenseItem.createdBy}`
      )
        .then((res) => res.json())
        .then((result) => this.setState({ name: result.name }))
        .catch((error) => this.setState({ name: "NA" }));
    }
  }

  render() {
    const expenseItem = (
      <Container>
        <Row className="border-bottom m-1" key={this.props.expenseItem.id}>
          <Col>
            {new Date(this.props.expenseItem.createdAt).toLocaleDateString(
              "en-US"
            )}
          </Col>
          <Col>
            <Image
              src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
              thumbnail
            />
          </Col>
          <Col>{this.props.expenseItem.name}</Col>
          <Col>
            <Row>{this.state.name} paid</Row>
            <Row>{this.props.expenseItem.amount}</Row>
          </Col>
        </Row>
      </Container>
    );
    return expenseItem;
  }
}

export default Expense;
