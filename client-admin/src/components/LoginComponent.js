import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import { Button, Form, Grid, Header, Message, Segment, Icon } from "semantic-ui-react";
import { CSSTransition } from "react-transition-group";
import "semantic-ui-css/semantic.min.css";
import "./Login.css";

class Login extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
      showPassword: false,
      error: "",
      loading: false,
      loginSuccess: false,
    };
  }

  toggleShowPassword = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    const { txtUsername, txtPassword, showPassword, error, loading, loginSuccess } = this.state;

    if (this.context.token === "") {
      return (
        <div className="login-container">
          <div className="background-image"></div>
          <div className="content">
            <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="teal" textAlign="center">
                  <Icon name="lock" /> ĐĂNG NHẬP
                </Header>
                <Form size="large">
                  <Segment stacked className={`transparent-segment ${loginSuccess ? 'success' : ''}`}>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Tên đăng nhập"
                      value={txtUsername}
                      onChange={(e) => {
                        this.setState({ txtUsername: e.target.value });
                      }}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Mật khẩu"
                      type={showPassword ? "text" : "password"}
                      value={txtPassword}
                      onChange={(e) => {
                        this.setState({ txtPassword: e.target.value });
                      }}
                    />
                    {error && <Message negative>{error}</Message>}
                    <CSSTransition
                      in={!loading}
                      timeout={500}
                      classNames="fade"
                      unmountOnExit
                    >
                      <Button
                        color="teal"
                        fluid
                        size="large"
                        onClick={(e) => this.btnLoginClick(e)}
                        disabled={loading}
                        loading={loading}
                        className={`login-button ${loginSuccess ? 'success' : ''}`}
                      >
                        <Icon name="sign-in" /> ĐĂNG NHẬP
                      </Button>
                    </CSSTransition>
                    <Message>
                      Quên mật khẩu? <a href="/forgot-password">Tạo lại mật khẩu</a>
                    </Message>
                    <div className="social-login">
                      <Button color="google plus" className="social-button">
                        <Icon name="google" /> Đăng nhập bằng Google
                      </Button>
                      <Button color="facebook" className="social-button">
                        <Icon name="facebook" /> Đăng nhập bằng Facebook
                      </Button>
                    </div>
                  </Segment>
                </Form>
                <Message>
                  Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
                </Message>
              </Grid.Column>
            </Grid>
          </div>
        </div>
      );
    }
    return <div />;
  }

  btnLoginClick(e) {
    e.preventDefault();
    const { txtUsername, txtPassword } = this.state;

    if (txtUsername && txtPassword) {
      this.setState({ loading: true });
      const account = { username: txtUsername, password: txtPassword };
      this.apiLogin(account);
    } else {
      this.setState({ error: "Vui lòng nhập tên đăng nhập và mật khẩu" });
    }
  }

  apiLogin(account) {
    axios.post("/api/admin/login", account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
        this.setState({ loginSuccess: true });
      } else {
        this.setState({ error: result.message });
      }
      this.setState({ loading: false });
    });
  }
}

export default Login;
