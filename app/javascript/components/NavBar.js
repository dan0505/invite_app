import React from "react";
import { Link } from "@reach/router";
import { Layout, Menu, Icon } from "antd";
const { Header } = Layout;
import "antd/dist/antd.css";

import Login from "components/Login"

export default ({ partial = true, ...props }) => (
  
  <Header>
    {console.log(props)}
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["2"]}
      style={{ lineHeight: "64px" }}
    >
      <Menu.Item key="1">
        <Link to="/dashboard/updates" className="nav-text">
          Updates
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/dashboard/add-evite" className="nav-text">
          <Icon type="plus" />
          New Evite
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/dashboard/groups" className="nav-text">
          Groups
        </Link>
      </Menu.Item>
    </Menu>
    <div style={{ position: "absolute", top: "0", right: "15px" }}>
      <Login userHandler={props.userHandler} user={props.user}/>
    </div>
  </Header>
);