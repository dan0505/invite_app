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

import NavBar from "components/NavBar";
import Footer from "components/Footer";

export default (props) => (

      <Layout>
        <NavBar userHandler={props.userHandler} user={props.user}/>
        <Row type="flex" justify="center">
          <Col span={20}>
            {props.children}
          </Col>
        </Row>
        <Footer />
      </Layout >
    )