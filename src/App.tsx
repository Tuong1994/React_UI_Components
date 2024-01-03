import React from "react";
import { UI } from "@/components";
import "./style/main.scss";

const { Card, Section, Grid, Loading } = UI;

const { Skeleton } = Loading;

const { Row, Col } = Grid;

function App() {
  return (
    <Section>
      <Row justify="between">
        <Col span={8}>
          <Card>
            <Row>
              <Col span={8}>
                <Skeleton type="image" options={{ shape: "circle" }} />
              </Col>
              <Col span={16}>
                <Skeleton type="title" options={{ shape: "round" }} />
                <Skeleton type="paragraph" options={{ shape: "round" }} />
                <Skeleton type="button" options={{ shape: "round" }} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Section>
  );
}

export default App;
