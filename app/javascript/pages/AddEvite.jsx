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
import ProgressBar from "components/ProgressBar";

const bodyPlaceholder = (user) => {
  if (user) {
    return (
      <div>
        <Row type="flex" justify="center">
          <Col span={15}>
            <ProgressBar step={0} />
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginTop: "30px" }}>
          <Col span={5}>
            <AddEventForm />
          </Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please Login to create Evite</h1>
        <Skeleton active />
      </div>);
  }
};

export default props => {
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
        {bodyPlaceholder(props.user)}
      </Content>
    </Layout>
  );
};
