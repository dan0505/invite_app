import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Row, Col, Button, notification, Divider, Typography } from "antd";
const { Title, Text } = Typography;

const BackgoundWrapper = styled.div`
  position: fixed;
  heght: 100vh;
  width: 100vw;
  background-image: url("https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Jumbotron = styled.div`
  position: fixed;
  width: 100vw;
  height: 40vh;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  width: 100%;
`;

const Container = styled.div`
  margin: 3rem 5rem;
`;

const openNotification = () => {
  notification["success"]({
    message: "Notification Title",
    description:
      "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    onClick: () => {
      console.log("Notification Clicked!");
    }
  });
};

export default () => (
  <BackgoundWrapper>
    <Jumbotron>
      <Container>
        <Title>EVITE</Title>
        <Text>Share within your circle!</Text>
        <Divider />
        <Button href="/add-evite" size="large">
          New Evite
        </Button>
        {/* <Button size="large" onClick={openNotification}>
          Open the notification box
        </Button> */}
        <Button href="/evites" type="link" size="large">
        Existing Evites
        </Button>
      </Container>
    </Jumbotron>
  </BackgoundWrapper>
);
