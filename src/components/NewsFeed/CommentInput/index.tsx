/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import styled from "styled-components";

import * as I from "../Image";

function CommentInput(props) {
  return (
    <Wrapper>
      <InputWrap>
        <Input type="text" />
        <IconWrap>
          <IconWrapFile type="file" id="input" />
          <label htmlFor="input">
            <IconSmall src={I.gif} />
          </label>
        </IconWrap>

        <IconWrap>
          <IconSmall src={I.happy} />
        </IconWrap>
      </InputWrap>
    </Wrapper>
  );
}

const InputWrap = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid #000;
  border-radius: 15px;
  padding: 0.5rem;
`;

const IconWrap = styled.div`
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-left: 0.5rem;
`;

const IconWrapFile = styled.input`
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-left: 0.5rem;
  display: none;
`;

const IconSmall = styled.img`
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  width: 100%;
  font-size: 15px;
  outline: none;
  border: none;
`;
export default CommentInput;
