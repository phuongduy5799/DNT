import axios from "axios";
import React, { Component } from "react";
import { Form, Input, Button } from "semantic-ui-react";

class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: "",
      txtToken: "",
    };
  }

  render() {
    return (
      <div className="align-center">
        <h2 className="text-center">ACTIVE ACCOUNT</h2>
        <Form>
          <Form.Field>
            <label>ID</label>
            <Input
              type="text"
              value={this.state.txtID}
              onChange={(e) => {
                this.setState({ txtID: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Token</label>
            <Input
              type="text"
              value={this.state.txtToken}
              onChange={(e) => {
                this.setState({ txtToken: e.target.value });
              }}
            />
          </Form.Field>
          <Button type="submit" onClick={(e) => this.btnActiveClick(e)}>
            ACTIVE
          </Button>
        </Form>
      </div>
    );
  }

  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert("Please input id and token");
    }
  }

  apiActive(id, token) {
    const body = { id: id, token: token };
    axios
      .post("http://localhost:4000/api/customer/active", body)
      .then((res) => {
        const result = res.data;
        if (result) {
          alert("OK");
        } else {
          alert("SORRY");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi kích hoạt tài khoản:", error);
      });
  }
}

export default Active;
