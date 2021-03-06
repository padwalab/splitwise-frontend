import axios from "axios";
import React, { Component } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";

class AddMember extends Component {
  state = {
    name: "",
    success: false,
    warning: false,
  };
  //  [singleSelections, setSingleSelections] = useState([]);

  handleAddMember = async (e) => {
    e.preventDefault();
    console.log(this.state.name.split("::")[0], this.state.name.split("::")[2]);
    axios
      .put(`http://localhost:8000/users/${this.props.groupId}/invite`, {
        // done
        email: this.state.name.split("::")[0],
      })
      .then((result) => this.setState({ success: true }))
      .catch((error) => this.setState({ warning: true }));
  };
  userNames = [];
  componentDidMount() {
    fetch(`http://localhost:8000/users/list`) // done
      .then((userLists) => userLists.json())
      .then((userList) =>
        userList.forEach((user) => {
          this.userNames.push(user.email + "::" + user.name + "::" + user.id);
        })
      );
    console.log(this.userNames);
  }
  render() {
    return (
      <Container className="w-75" fluid>
        <h2 className="font-weight-light border-bottom m-2">
          :::Add Member::: {this.props.groupName.toUpperCase()}
        </h2>
        {this.state.warning ? (
          <Alert variant="danger">Failed to add member.</Alert>
        ) : null}
        {this.state.success ? (
          <Alert variant="success">Add member successfull.</Alert>
        ) : null}
        <Form onSubmit={(e) => this.handleAddMember(e)}>
          <Form.Group controlId="formMemberName">
            <Form.Label>Member name</Form.Label>
            {/* <Form.Control
              type="text"
              placeholder="name of user"
              value={this.state.name}
              onChange={(e) => this.handleAddName(e.target.value)}
            /> */}
            <Typeahead
              id="basic-typeahead-single"
              labelKey="name"
              single
              onChange={(e) => this.setState({ name: e[0] })}
              options={this.userNames}
              placeholder="Choose several Users..."
              //   selected={this.state.name}
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
export default connect(mapStateToProps)(AddMember);
