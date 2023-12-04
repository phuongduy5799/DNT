import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import MyContext from "../contexts/MyContext";
import "./Myprofile.css";

class Myprofile extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
      txtName: "",
      txtPhone: "",
      txtEmail: "",
    };
  }

  componentDidMount() {
    if (localStorage.customer) {
      const customer = JSON.parse(localStorage.customer);

      this.setState({
        txtUsername: customer.username,
        txtPassword: customer.password,
        txtName: customer.name,
        txtPhone: customer.phone,
        txtEmail: customer.email,
      });
    }
  }

  render() {
    const token = localStorage.getItem("token");
    if (token === null) return <Navigate replace to="/login" />;

    return (
      <div className="myprofile-container">
        <h2 className="myprofile-heading">MY PROFILE</h2>
        <form className="myprofile-form">
          <table className="myprofile-table">
            <tbody>
              <tr>
                <td>Username</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtUsername}
                    onChange={(e) => {
                      this.setState({ txtUsername: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td>
                  <input
                    type="password"
                    value={this.state.txtPassword}
                    onChange={(e) => {
                      this.setState({ txtPassword: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    value={this.state.txtName}
                    onChange={(e) => {
                      this.setState({ txtName: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>
                  <input
                    type="tel"
                    value={this.state.txtPhone}
                    onChange={(e) => {
                      this.setState({ txtPhone: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input
                    type="email"
                    value={this.state.txtEmail}
                    onChange={(e) => {
                      this.setState({ txtEmail: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <input
                    type="submit"
                    value="UPDATE"
                    className="myprofile-button"
                    onClick={(e) => this.btnUpdateClick(e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;

    if (username && password && name && phone && email) {
      const customer = {
        username: username,
        password: password,
        name: name,
        phone: phone,
        email: email,
      };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert("Please input username, password, name, phone, and email");
    }
  }

  apiPutCustomer(id, customer) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios
      .put("http://localhost:4000/api/customer/customers/" + id, customer, config)
      .then((res) => {
        const result = res.data;
        if (result) {
          alert("OK BABY!");
          this.context.setCustomer(result);
        } else {
          alert("SORRY BABY!");
        }
      });
  }
}

export default Myprofile;
