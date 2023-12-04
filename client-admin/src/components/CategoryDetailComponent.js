import axios from "axios";
import React, { Component } from "react";
import { Form, Input, Button, Grid, Segment } from "semantic-ui-react";
import MyContext from "../contexts/MyContext";

class CategoryDetail extends Component {
  static contextType = MyContext; // sử dụng this.context để truy cập global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: "",
      txtName: "",
    };
  }

  componentDidMount() {
    this.updateForm();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.updateForm();
    }
  }

  updateForm() {
    const { item } = this.props;
    if (item) {
      this.setState({
        txtID: item._id,
        txtName: item.name,
      });
    } else {
      this.setState({
        txtID: "",
        txtName: "",
      });
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAddClick = (e) => {
    e.preventDefault();
    const { txtName } = this.state;
    if (txtName) {
      const cate = { name: txtName };
      this.apiPostCategory(cate);
    } else {
      alert("Please input name");
    }
  };

  handleUpdateClick = (e) => {
    e.preventDefault();
    const { txtID, txtName } = this.state;
    if (txtID && txtName) {
      const cate = { name: txtName };
      this.apiPutCategory(txtID, cate);
    } else {
      alert("Please input id and name");
    }
  };

  handleDeleteClick = (e) => {
    e.preventDefault();
    if (window.confirm("ARE YOU SURE?")) {
      const { txtID } = this.state;
      if (txtID) {
        this.apiDeleteCategory(txtID);
      } else {
        alert("Please input id");
      }
    }
  };

  apiPostCategory(cate) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .post("/api/admin/categories", cate, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          alert("OK");
          this.apiGetCategories();
        } else {
          alert("SORRY");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  apiGetCategories() {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .get("/api/admin/categories", config)
      .then((res) => {
        const result = res.data;
        this.props.updateCategories(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  apiPutCategory(id, cate) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .put("/api/admin/categories/" + id, cate, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          alert("OK");
          this.apiGetCategories();
        } else {
          alert("SORRY");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  apiDeleteCategory(id) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .delete("/api/admin/categories/" + id, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          alert("OK");
          this.apiGetCategories();
        } else {
          alert("SORRY");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { txtID, txtName } = this.state;

    return (
      <div className="float-right">
        <h2 className="text-center">Sản Phẩm</h2>
        <Form>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label>ID</label>
                  <Input type="text" name="txtID" value={txtID} readOnly />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>Name</label>
                  <Input
                    type="text"
                    name="txtName"
                    value={txtName}
                    onChange={this.handleInputChange}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Segment basic textAlign="center">
            <Button.Group vertical>
              <Button
                primary
                onClick={this.handleAddClick}
                style={{ border: "1px solid #2185d0" }}
              >
                ADD NEW
              </Button>
              <Button
                primary
                onClick={this.handleUpdateClick}
                style={{ border: "1px solid #2185d0" }}
              >
                UPDATE
              </Button>
              <Button
                primary
                onClick={this.handleDeleteClick}
                style={{ border: "1px solid #2185d0" }}
              >
                DELETE
              </Button>
            </Button.Group>
          </Segment>
        </Form>
      </div>
    );
  }
}

export default CategoryDetail;
