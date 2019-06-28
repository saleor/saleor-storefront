import React from "react";
import { Col, Row } from "react-styled-flexboxgrid";

import { IProps } from "./types";

export const TileGrid: React.FC<IProps> = ({
  elements,
  xs = 12,
  md = 4,
  lg = 4,
  sm = 12,
}: IProps) => {
  return (
    <Row>
      {elements.map((element: React.ReactNode) => (
        <Col xs={xs} sm={sm} md={md} lg={lg}>
          {element}
        </Col>
      ))}
    </Row>
  );
};
