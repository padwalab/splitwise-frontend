import axios from "axios";
import { connect } from "react-redux";
import React, { Component } from "react";
import {
  Col,
  Row,
  Image,
  Container,
  InputGroup,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Note from "./note";

class Expense extends Component {
  state = {
    name: "NA",
    hidden: true,
    comment: "",
    notesData: [],
  };

  componentDidMount() {
    // if (this.props.expenseItem.createdBy !== undefined) {
    //   fetch(
    //     `http://localhost:8000/api/user/${this.props.expenseItem.createdBy}`
    //   )
    //     .then((res) => res.json())
    //     .then((result) => this.setState({ name: result.name }))
    //     .catch((error) => this.setState({ name: "NA" }));
    // } else {
    //   this.setState({ name: this.props.expenseItem.payeeName });
    // }
    this.setState({ notesData: this.props.expenseItem.notes });
  }

  render() {
    const handleComment = (comment) => {
      this.setState({ comment });
      console.log(this.state.comment);
    };
    const handleClick = () => {
      this.setState({ hidden: !this.state.hidden });
      console.log("clicked");
      console.log(
        "showstate",
        this.state.hidden ? console.log("showing") : console.log("hidden")
      );
    };

    const handlePostComment = () => {
      axios
        .put(
          `http://localhost:8000/expense/${this.props.expenseItem.id}/comment`,
          {
            note: this.state.comment,
            userId: this.props.currentUser.id,
          }
        )
        .then((res) => {
          console.log(res);
          this.setState({ notesData: res.data.notes });
        });
      console.log(this.state.comment);
      this.setState({ comment: "" });
    };

    const notes = this.props.expenseItem.notes ? (
      <React.Fragment>
        {this.props.expenseItem.notes
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((item) => (
            <Note key={item.id} noteItem={item} />
          ))}
      </React.Fragment>
    ) : null;
    const expenseItem = (
      <Container fluid>
        <Row className="border-bottom" key={this.props.expenseItem.id}>
          <Col className="float-left" xs lg="2">
            {new Date(this.props.expenseItem.createdAt).toLocaleDateString(
              "en-US"
            )}
          </Col>
          <Col xs lg="2">
            <Image
              src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
              thumbnail
              onClick={() => handleClick()}
            />
          </Col>
          <Col>{this.props.expenseItem.name}</Col>
          <Col>
            <Row>{this.props.expenseItem.createdBy.name} paid</Row>
            <Row>{this.props.expenseItem.amount}</Row>
          </Col>
        </Row>
        <Row hidden={this.state.hidden} className="border-bottom">
          <Row>Notes and Comments:</Row>
          <Row className="float-right">
            <Form inline>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text id="search-thumb">💬</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Enter note/comment"
                  value={this.state.comment}
                  onChange={(e) => handleComment(e.target.value)}
                />
                <Button size="sm" onClick={() => handlePostComment()}>
                  Post
                </Button>
              </InputGroup>
            </Form>
          </Row>
          <Row>{notes}</Row>
        </Row>
      </Container>
    );
    return expenseItem;
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Expense);
