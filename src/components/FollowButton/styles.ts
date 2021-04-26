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

export const Button = styled.p<{ isActive: boolean; color: any }>`
  min-width: 130px;
  position: relative;
  display: inline-block;

  text-align: center;
  text-transform: uppercase;

  padding: 15px;

  cursor: pointer;

  font-size: 12px + 40%;
  font-weight: 600;

  color: ${props => (props.isActive ? "#fff" : props.color)};
  background-color: ${props => (props.isActive ? props.color : "#fff")};

  border: 1px solid;
  border-color: ${props => (props.isActive ? "#fff" : props.color)};

  transition: 0.5s;

  &:before {
    position: absolute;
    content: "";
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;

    transition: 0.5s;
  }

  &:hover {
    box-shadow: 7px 7px
        ${props => (props.isActive ? `${props.color}30` : `${props.color}80`)},
      -7px -7px
        ${props => (props.isActive ? `${props.color}80` : `${props.color}30`)};
    cursor: pointer;
    &::before {
      border: 0px;
    }
  }
`;
