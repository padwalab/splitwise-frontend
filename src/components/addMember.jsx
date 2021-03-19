import axios from "axios";
import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";

class AddMember extends Component {
  state = {
    name: "",
  };
  //  [singleSelections, setSingleSelections] = useState([]);

  handleAddMember = async (e) => {
    e.preventDefault();
    console.log(this.state.name.split("::")[0], this.state.name.split("::")[2]);
    axios
      .post(
        `http://localhost:8000/api/groups/${this.props.groupId}/addmember`,
        {
          userId: this.state.name.split("::")[2],
        }
      )
      .then((result) => console.log(result.data))
      .catch((error) => console.log(error));
  };
  userNames = [];
  componentDidMount() {
    fetch(`http://localhost:8000/api/userlist`)
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
