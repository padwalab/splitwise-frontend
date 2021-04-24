import React, { Component } from "react";
import { Col, Row, Image, Container } from "react-bootstrap";

class Payment extends Component {
  state = {
    name: "NA",
  };

  componentDidMount() {
    // if (this.props.expenseItem.createdBy !== null) {
    //   fetch(
    //     `http://localhost:8000/api/user/${this.props.expenseItem.createdBy}`
    //   )
    //     .then((res) => res.json())
    //     .then((result) => this.setState({ name: result.name }))
    //     .catch((error) => this.setState({ name: "NA" }));
    // }
    console.log("payments", this.props.paymentItem);
  }

  render() {
    const paymentItem = (
      <Container fluid>
        <Row className="border-bottom" key={this.props.paymentItem.id}>
          <Col className="float-left" xs lg="2">
            {new Date(this.props.paymentItem.createdAt).toLocaleDateString(
              "en-US"
            )}
          </Col>
          <Col xs lg="2">
            <Image
              src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
              thumbnail
            />
          </Col>
          <Col>{this.props.paymentItem.id}</Col>
          <Col>
            <Row>{this.props.paymentItem.payer.member.name} paid</Row>
            <Row>{this.props.paymentItem.payee.member.name}</Row>
            <Row>Amount: {this.props.paymentItem.amount}</Row>
          </Col>
        </Row>
      </Container>
    );
    return paymentItem;
  }
}

export default Payment;
