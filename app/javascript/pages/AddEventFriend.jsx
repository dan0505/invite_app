import React from "react";
import axios from "axios";
import { Redirect } from "@reach/router";
import {
  Layout,
  Input,
  Menu,
  Icon,
  Skeleton,
  Button,
  Popover,
  Steps,
  Row,
  Col,
  Select
} from "antd";
const { Header, Content, Sider } = Layout;
const InputGroup = Input.Group;
const { Option } = Select;
import "antd/dist/antd.css";

import ProgressBar from "components/ProgressBar";

export default class AddEventFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      created: false,
      event: {
        id: props.event_id,
        name: ""
      },
      users: [
        {
          role: "",
          name: "",
          email: "",
          responded: ""
        }
      ]
    };
  }

  userConstructor = (role = "", name = "", email = "") => {
    return {
      role: role,
      name: name,
      email: email,
      responded: ""
    };
  };

  componentDidMount() {
    let _this = this;
    axios
      .get(`/api/events/${this.props.event_id}`)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name.split("_");
    console.log(value, name);
    let state = this.state;
    state[name[0]][name[2]][name[1]] = value;
    console.log(state);
    // if (["recipe", "serve", "url"].includes(name[0])) {
    //   this.setState({
    //     [name[0]]: value
    //   });
    // } else if (name[0] === "ingrd") {
    //   if (name[1] === "qty") {
    //     state.ingredients[name[2]].qty = value
    //   } else if (name[1] === "unit") {
    //     state.ingredients[name[2]].unit = value
    //   } else {
    //     state.ingredients[name[2]].name = value
    //   }
    //   this.setState({
    //     ingredients: state.ingredients
    //   });
    // } else if (name[0] === "step") {
    //   state.instructions[name[1]] = value
    //   this.setState({
    //     instructions: state.instructions
    //   });
    // }
  };

  addUser = e => {
    let users = this.state.users;
    users.push(this.userConstructor());
    this.setState({
      users: users
    });
    e.preventDefault();
  };

  dropUser = e => {
    let users = this.state.users;
    users.pop();
    this.setState({
      users: users
    });
    e.preventDefault();
  };

  handleSubmit = e => {
    let _this = this;
    axios
      .put(`/api/events/${this.props.event_id}`, {
        users: this.state.users
      })
      .then(function(response) {
        console.log(response);
        const data = response.data;
        console.log(data);
        _this.setState({
          created: true
        })
      })
      .catch(function(error) {
        console.log(error);
        window.flash(`error! ${error.error}`);
      });
  };

  render() {
    let users = this.state.users;
    console.log(users);
    if (this.state.created) {
      return <Redirect noThrow to={`/dashboard/event-success`}/>;
    } else {
      return (
        <Layout style={{ padding: "24px", minHeight: "80vh" }}>
          {console.log("adding friend")}
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <Row type="flex" justify="center">
              <Col span={15}>
                <ProgressBar step={1} />
              </Col>
            </Row>
            <Row type="flex" justify="center" style={{ marginTop: "30px" }}>
              <Col span={12}>
                Add Your Friends
              <table>
                  <thead>
                    <tr>
                      <td></td>
                      <td>name</td>
                      <td>email</td>
                      <td>role</td>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, idx) => {
                      return (
                        <tr key={`users_${idx}`}>
                          <td>{idx + 1}</td>
                          <td>
                            <Input
                              size="large"
                              placeholder="Your friend name"
                              name={`users_name_${idx}`}
                              onChange={this.handleChange}
                            />
                          </td>
                          <td>
                            <Input
                              size="large"
                              placeholder="email"
                              name={`users_email_${idx}`}
                              onChange={this.handleChange}
                            />
                          </td>
                          <td>
                            <select
                              name={`users_role_${idx}`}
                              onChange={this.handleChange}
                            >
                              <option value="creator">creator</option>
                              <option value="member">member</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <Button.Group size="large" style={{ marginTop: "10px" }}>
                  <Button onClick={this.addUser}>+</Button>
                  <Button onClick={this.dropUser}>-</Button>
                </Button.Group>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span={5}>
                <Button
                  shape="round"
                  type="primary"
                  size="large"
                  style={{ marginTop: "20px" }}
                  onClick={this.handleSubmit}
                >
                  Next
                <Icon type="caret-right" />
                </Button>
              </Col>
            </Row>
          </Content>
        </Layout>
      );
    }
  }
}
