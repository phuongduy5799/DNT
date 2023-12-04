import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
      txtName: "",
      txtPhone: "",
      txtEmail: "",
      placeholders: {
        txtUsername: "Nhập tên đăng nhập",
        txtPassword: "Nhập mật khẩu",
        txtName: "Nhập họ tên",
        txtPhone: "Nhập số điện thoại",
        txtEmail: "Nhập địa chỉ email",
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFocus = (name) => {
    const placeholders = { ...this.state.placeholders };
    placeholders[name] = "";
    this.setState({ placeholders });
  };

  handleBlur = (name) => {
    const placeholders = { ...this.state.placeholders };
    if (this.state[name] === "") {
      placeholders[name] = "Nhập " + name;
    }
    this.setState({ placeholders });
  };

  btnSignupClick = (e) => {
    e.preventDefault();
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail } = this.state;

    if (txtUsername && txtPassword && txtName && txtPhone && txtEmail) {
      const account = {
        username: txtUsername,
        password: txtPassword,
        name: txtName,
        phone: txtPhone,
        email: txtEmail,
      };
      this.apiSignup(account);
    } else {
      alert("Vui lòng nhập đầy đủ thông tin tài khoản");
    }
  };

  apiSignup(account) {
    // Gọi API đăng ký tài khoản
    alert("Đăng ký thành công!");
  }

  render() {
    const { txtUsername, txtPassword, txtName, txtPhone, txtEmail, placeholders } = this.state;

    return (
      <div className="signup-container">
        <h2 className="signup-title">Đăng ký</h2>
        <Form className="signup-form">
          <Form.Field>
            <label>Tên đăng nhập</label>
            <input
              type="text"
              name="txtUsername"
              value={txtUsername}
              onChange={this.handleChange}
              onFocus={() => this.handleFocus("txtUsername")}
              onBlur={() => this.handleBlur("txtUsername")}
              placeholder={placeholders.txtUsername}
            />
          </Form.Field>
          <Form.Field>
            <label>Mật khẩu</label>
            <input
              type="password"
              name="txtPassword"
              value={txtPassword}
              onChange={this.handleChange}
              onFocus={() => this.handleFocus("txtPassword")}
              onBlur={() => this.handleBlur("txtPassword")}
              placeholder={placeholders.txtPassword}
            />
          </Form.Field>
          <Form.Field>
            <label>Họ tên</label>
            <input
              type="text"
              name="txtName"
              value={txtName}
              onChange={this.handleChange}
              onFocus={() => this.handleFocus("txtName")}
              onBlur={() => this.handleBlur("txtName")}
              placeholder={placeholders.txtName}
            />
          </Form.Field>
          <Form.Field>
            <label>Số điện thoại</label>
            <input
              type="tel"
              name="txtPhone"
              value={txtPhone}
              onChange={this.handleChange}
              onFocus={() => this.handleFocus("txtPhone")}
              onBlur={() => this.handleBlur("txtPhone")}
              placeholder={placeholders.txtPhone}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              type="email"
              name="txtEmail"
              value={txtEmail}
              onChange={this.handleChange}
              onFocus={() => this.handleFocus("txtEmail")}
              onBlur={() => this.handleBlur("txtEmail")}
              placeholder={placeholders.txtEmail}
            />
          </Form.Field>
          <Button primary className="signup-button" onClick={this.btnSignupClick}>
            Đăng ký
          </Button>
        </Form>
      </div>
    );
  }
}

export default Signup;
