import React from "react";
import axios from "axios";
import {
  Icon,
  Input,
  Button,
  Checkbox,
  Avatar,
  Popover,
  Tabs,
  Spin
} from "antd";
import { ThemeProvider } from "styled-components";
const { TabPane } = Tabs;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log("props in login", props)

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    let _this = this;
    axios
      .get("/api/sessions/logged_in")
      .then(function (response) {
        console.log(response);
        if (response.data.logged_in) {
          console.log(response.data.user);
          _this.props.userHandler(response.data.user);
        } else {
          console.log("not logged in")
          _this.props.userHandler(null);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmitPassword = e => {
    let _this = this;
    e.preventDefault();
    axios
      .post("/api/sessions", {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(function (response) {
        console.log(response);
        _this.props.userHandler(response.data.user);
        window.flash(`You have logged in as ${response.data.user.name}`)
      })
      .catch(function(error) {
        console.log(error);
        if (error.response) {
          if (error.response.status === 401) {
            console.log("login failed, use not match");
            window.flash("Password Invalid", "error");
          }
        }
      });
  };

  loginForm = (
    <form className="login-form" onSubmit={this.handleSubmitPassword}>
      <Input
        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Username/email"
        name="email"
        onChange={this.handleChange}
      ></Input>
      <Input.Password
        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Password"
        name="password"
        onChange={this.handleChange}
        style={{ marginTop: "1rem", width: "100%" }}
      ></Input.Password>
      <Button
        type="primary"
        htmlType="submit"
        className="login-form-button"
        style={{ marginTop: "1rem" }}
      >
        Login
      </Button>
    </form>
  );
  emailForm = (
    <form>
      <Input prefix={<Icon type="mail" />}></Input>
      <Button type="primary" style={{ marginTop: "1rem" }}>
        Send Link
      </Button>
    </form>
  );
  formTabs = (
    <Tabs defaultActiveKey="1" style={{ width: "300px" }}>
      <TabPane tab="Password Login" key="1">
        {this.loginForm}
      </TabPane>
      <TabPane tab="Email Link" key="2">
        {this.emailForm}
      </TabPane>
    </Tabs>
  );

  handleLogout = () => {
    let _this = this;
    axios
      .get("/api/sessions/logout")
      .then(function(response) {
        console.log(response);
        window.flash("You have logged out");
        _this.props.userHandler(null)
      })
      .catch(function(error) {
        console.log(error);
        if (error.response) {
          if (error.response.status === 401) {
            window.flash("Logout failed, try again", "error");
          }
        }
      });
  }

  logged_in = () => {
    if (this.props.user) {
      console.log(this.props.user);
      return (
        <div>
          <span style={{ color: "white", marginRight: "1rem" }}>
            Hi, {this.props.user.name}
          </span>
          <Button onClick={this.handleLogout}>Logout</Button>
        </div>
      );
    } else {
      return (
        <Popover
          placement="bottomLeft"
          content={this.formTabs}
          trigger="click"
          defaultVisible={true}
        >
          <Button>Login</Button>
        </Popover>
      );
    }
  }

  render() {
    return <div>{this.logged_in()}</div>;
  }
}
