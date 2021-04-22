import styled from "styled-components";

export const WrapperContainer = styled.div`
  width: 60%;
  @media screen and (max-width: 1080px) {
    width: 80%;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
