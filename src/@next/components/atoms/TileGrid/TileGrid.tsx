import React from "react";
import { Col, Row } from "react-styled-flexboxgrid";

// import * as S from "./styles";
import { IProps } from "./types";

export const TileGrid: React.FC<IProps> = ({ elements }: IProps) => {
  return (
    <Row>
      <Col xs={12} lg={4}>
        {elements[0]}
      </Col>
      <Col xs={12} lg={4}>
        {elements[1]}
      </Col>
      <Col xs={12} lg={4}>
        {elements[2]}
      </Col>
      <Col xs={12} lg={4}>
        {elements[3]}
      </Col>
      <Col xs={12} lg={4}>
        {elements[3]}
      </Col>
    </Row>
  );
};
