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
const { Header, Content, Sider } = Layout;
import "antd/dist/antd.css";

import ProgressBar from "components/ProgressBar"

export default class AddEventFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };


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
          <Row type="flex" justify="center">
            <Col span={15}>
              <ProgressBar step={1} />
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}