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
const { TabPane } = Tabs;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      user: null
    };
    this.updateParent = this.props.updateUser;
    this.checkLogin = this.checkLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.updateParentUser = this.updateParentUser.bind(this);
  }

  componentDidMount() {
    this.checkLogin();
  }

  updateParentUser(user) {
    let _this = this;
    let previousUser = localStorage.getItem("logged_in") || "false";
    if (JSON.stringify(user) != previousUser) {
      localStorage.setItem("logged_in", JSON.stringify({ "user": user }));
      // _this.props.updateUser(user);
      _this.updateParent(user);
      if (user) {
        window.flash(`Logged in as ${user.name}`);
      } else {
        window.flash("Logged out");
      }
    }
  }

  checkLogin() {
    let _this = this;
    axios
      .get("/api/sessions/logged_in")
      .then(function(response) {
        _this.updateParentUser(response.data.user);
        _this.setState({
          logged_in: true
        });
      })
      .catch(function(error) {
        console.log(error.response);
        _this.updateParentUser(false);
        _this.setState({
          logged_in: false
        });
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
      .then(function(response) {
        _this.updateParentUser(response.data.user);
        _this.setState({
          logged_in: true
        });
      })
      .catch(function(error) {
        console.log(error);
        if (error.response) {
          if (error.response.status === 401) {
            console.log("login failed, use not match");
            window.flash("Password Invalid", "error");
          }
        }
        _this.updateParentUser(false);
        _this.setState({
          logged_in: false
        });
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

  handleLogout() {
    let _this = this;
    axios
      .get("/api/sessions/logout")
      .then(function(response) {
        _this.updateParentUser(false);
        _this.setState({
          logged_in: false
        });
      })
      .catch(function(error) {
        console.log(error);
        if (error.response) {
          if (error.response.status === 401) {
            console.log("logout failed, use not match");
            window.flash("Logout failed, try again", "error");
          }
        }
      });
  }

  logged_in() {
    if (this.state.logged_in) {
      let user = false;
      let local_user = localStorage.getItem("logged_in");
      if (local_user) {
        user = JSON.parse(local_user)
      }
      console.log(user);
      return (
        <div>
          <span style={{ color: "white", marginRight: "1rem" }}>
            Hi, {user.user.name}
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
