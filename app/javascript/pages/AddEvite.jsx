import React from "react";

import {
  Layout,
  Menu,
  Icon,
  Skeleton,
  Button,
  Popover,
  Steps,
  Row,
  Col
} from "antd";
import "antd/dist/antd.css";
import { Link } from "@reach/router";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Step } = Steps;
import Footer from "../components/Footer";

import AddEventForm from "../components/AddEventForm";
import ProgressBar from "components/ProgressBar"

export default class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: function () {
        let user = false;
        let local_user = localStorage.getItem("logged_in");
        if (local_user) {
          user = JSON.parse(local_user)
        }
        return user;
      }
    };
    this.bodyPlaceholder = this.bodyPlaceholder.bind(this);
  }

  userUpdated(user) {
    this.setState({
      user: user
    });
  }

  bodyPlaceholder() {
    if (this.state.user) {
      return (
        <div>
          <Row type="flex" justify="center">
            <Col span={15}><ProgressBar step={0}/></Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "30px" }}>
            <Col span={5}>
              <AddEventForm />
            </Col>
          </Row>
        </div>
      );
    } else {
      return <Skeleton active />;
    }
  }

  render() {
    return (
      <Layout style={{ padding: "24px", minHeight: "80vh" }}>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          {this.bodyPlaceholder()}
        </Content>
      </Layout>
    );
  }
}
