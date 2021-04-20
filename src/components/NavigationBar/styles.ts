import styled from "styled-components";

export const WrapperAll = styled.div`
  background: #ff6a00;
  display: flex;
  justify-content: center;
  min-height: 40px;
`;
export const Wrapper = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1080px) {
    width: 90%;
  }
`;

export const NavBox = styled.div<{ stt: boolean }>`
  top: 0;
  left: 0;
  z-index: 100;
  height: 100%;
  flex: 1;
  display: ${props => props.stt && "block"};
  @media screen and (max-width: 1080px) {
    display: ${props => (props.stt ? "block" : "none")};
    width: ${props => props.stt && "100vw"};
    height: ${props => (props.stt ? "100vh" : "100%")};
    background: ${props => (props.stt ? "#00000070" : "none")};
    position: ${props => (props.stt ? "fixed" : "relative")};
  }
`;

export const NavList = styled.ul<{ stt?: boolean }>`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  flex: 1;
  height: 100%;

  background: ${props => props.stt && "#fff"};
  @media screen and (max-width: 1080px) {
    flex-direction: column;
    height: 100vh;
    width: 300px;
    background: #fff;
  }
  z-index: 1000;
`;

export const NavListItem = styled.li`
  color: #fff;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background: #00000030;
  }
  display: flex;
  align-items: center;
  padding: 0 17px;

  @media screen and (max-width: 1080px) {
    color: #000;
    padding: 20px;
  }
`;

export const DropDownItem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  aligns-item: center;
  white-space: nowrap;
  position: relative;
  &:hover {
    background: #f1f1f1;
    color: red;
    text-decoration: underline;
  }
`;

export const DropDownContent = styled.div`
  color: #000;
  position: absolute;
  left: 0;
  bottom: 0;
  box-shadow: 0px 0px 9px grey;
  border-radius: 0 0 5px 5px;
  display: none;
  transform: translateY(100%);
  height: fit-content;
  background: #fff;
  z-index: 1000;
  ${NavListItem}:hover & {
    display: block;
    .sub {
      display: none;
    }
  }
  ${DropDownItem}:hover & {
    display: block !important;
  }
  .sub {
    right: 0;
    top: 0;
    transform: translateX(101%);
  }

  @media screen and (max-width: 1080px) {
    right: 0;
    top: 0;
    transform: translateX(100%);
    background: #fff;
  }
`;

export const Icon = styled.svg<{ child?: boolean }>`
  transition: 0.3s;
  width: fit-content;
  fill: ${props => (props.child ? "#000" : "#fff")};
  margin-left: 5px;
  ${NavListItem}:hover & {
    transform: rotate(180deg);
  }
  display: inline;
  width: 19px;
  height: 16px;
  @media screen and (max-width: 1080px) {
    fill: #000;
    transform: rotate(-90deg);
    ${NavListItem}:hover & {
      transform: rotate(0deg);
    }
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  // height: 15px;
  border-radius: 30px;
  padding: 10px;
  margin: 5px 0;
`;

export const SearchInput = styled.input`
  type: "text";
  border: none;
  outline: none;
  float: left;
  padding: 0;
  font-size: 16px;
  height: 30px;
`;

export const SearchBtn = styled.button`
  type: "submit";
  outline: none;
  border: none;
  background: none;
  color: red;
  float: right;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const H = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 25px;
  flex: 1;
  display: none;
  @media screen and (max-width: 1080px) {
    display: flex;
  }
  cursor: pointer;
`;
