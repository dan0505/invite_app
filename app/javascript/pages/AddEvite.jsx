import React from "react";

import { Layout, Menu, Icon, Skeleton, Button, Popover, Steps, Row, Col } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Step } = Steps;
import Footer from "../components/Footer";
import Login from "../components/Login";

export default class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("logged_in"))
    };
    this.userUpdated = this.userUpdated.bind(this);
    this.bodyPlaceholder = this.bodyPlaceholder.bind(this);
    this.progressBar = this.progressBar.bind(this);
  }

  userUpdated(user) {
    this.setState({
      user: user
    });
  }

  progressBar(step) {
    return (
      <Steps current={step}>
          <Step title="Create Event" description="Add details to your event." />
          <Step
            title="Add Friends"
            description="Add your friend emails so we can sent them the Evite."
          />
          <Step
            title="Done!" description="That's it!." />
        </Steps>
    )
  }

  bodyPlaceholder() {
    if (this.state.user) {
      return (
        this.progressBar(0)
      );
    } else {
      return <Skeleton active />;
    }
  }

  render() {
    return (
      <Layout>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">Updates</Menu.Item>
            <Menu.Item key="2"><Icon type="plus" />New Evite</Menu.Item>
            <Menu.Item key="3">Groups</Menu.Item>
          </Menu>
          <div style={{ position: "absolute", top: "0", right: "15px" }}>
            <Login updateUser={this.userUpdated} />
          </div>
        </Header>
        <Row type="flex" justify="center">
          <Col span={20}>
            <Layout style={{ padding: "24px" }}>
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
          </Col>
        </Row>

        <Footer />
      </Layout>
    );
  }
}
