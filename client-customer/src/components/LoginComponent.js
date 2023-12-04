import axios from "axios";
import React, { useContext, useState } from "react";
import { Form, Button, Header } from "semantic-ui-react";
import MyContext from "../contexts/MyContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { setToken, setCustomer } = useContext(MyContext);
  const [txtUsername, setTxtUsername] = useState("");
  const [txtPassword, setTxtPassword] = useState("");
  const params = useParams();

  const handleLogin = (e) => {
    e.preventDefault();
    if (txtUsername && txtPassword) {
      const account = { username: txtUsername, password: txtPassword };
      apiLogin(account);
    } else {
      alert("Vui lòng nhập tên đăng nhập và mật khẩu");
    }
  };

  const apiLogin = (account) => {
    axios
      .post("http://localhost:4000/api/customer/login", account)
      .then((res) => {
        const result = res.data;
        if (result.success === true) {
          setToken(result.token);
          setCustomer(result.customer);
          localStorage.setItem("token", result.token);
          localStorage.setItem("customer", JSON.stringify(result.customer));
          navigate("/home");
        } else {
          alert(result.message);
        }
      });
  };

  return (
    <div className="login-container">
      <Header as="h2" textAlign="center" className="login-title">
        Đăng nhập
      </Header>
      <Form className="login-form">
        <Form.Field>
          <label>Username</label>
          <Form.Input
            type="text"
            value={txtUsername}
            onChange={(e) => setTxtUsername(e.target.value)}
            placeholder="Nhập tên đăng nhập"
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Form.Input
            type="password"
            value={txtPassword}
            onChange={(e) => setTxtPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
          />
        </Form.Field>
        <Button primary fluid onClick={handleLogin}>
          Đăng nhập
        </Button>
      </Form>
      <div className="register-link">
        Bạn chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
      </div>
    </div>
  );
};

export default Login;
