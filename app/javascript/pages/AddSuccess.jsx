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
  Col,
  Result
} from "antd";
const { Header, Content, Sider } = Layout;
import "antd/dist/antd.css";

import ProgressBar from "components/ProgressBar";

export default class AddSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let users = this.state.users;
    console.log(users);
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
              <ProgressBar step={2} />
            </Col>
          </Row>
          <Result
            status="success"
            title="Successfully Created Evite!"
            subTitle="All evites are sent to your friends."
          />
        </Content>
      </Layout>
    );
  }
}
