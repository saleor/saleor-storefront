import React from "react";

import { Overlay } from "../";

import { IconButton } from "@components/atoms";
import { FilterAttribute } from "@components/molecules";
import { useHandlerWhenClickedOutside } from "../../../hooks";
import * as S from "./styles";
import { IProps } from "./types";

export const FilterSidebar: React.FC<IProps> = ({ target }: IProps) => {
  const [show, setShow] = React.useState(true);
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setShow(false);
  });
  return (
    <Overlay position="left" show={show} hide={() => 0} target={target}>
      <S.Wrapper ref={setElementRef()}>
        <S.Header>
          <span>FILTERS</span>
          <IconButton
            onClick={() => {
              setShow(false);
            }}
            name="x"
            size={18}
            color="000"
          />
        </S.Header>
        <FilterAttribute
          name="Brand"
          values={[
            {
              name: "Nike",
              slug: "nike",
            },
            {
              name: "Adidas",
              slug: "adidas",
            },
            {
              name: "Puma",
              slug: "puma",
            },
          ]}
        />
        <FilterAttribute
          name="Size"
          values={[
            {
              name: "39",
              slug: "39",
            },
            {
              name: "40",
              slug: "40",
            },
            {
              name: "41",
              slug: "41",
            },
            {
              name: "42",
              slug: "42",
            },
            {
              name: "43",
              slug: "43",
            },
            {
              name: "44",
              slug: "44",
            },
            {
              name: "45",
              slug: "45",
            },
          ]}
        />
      </S.Wrapper>
    </Overlay>
  );
};
