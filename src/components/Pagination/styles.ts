import styled from "styled-components";

export const PaginationWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  height: 50px;
  display: flex;
  justify-content: center;
`;

export const PaginationItem = styled.li<{ isActive?: Boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e8e8e8;
  padding: 10px 15px;
  cursor: pointer;
  color: ${props => (props.isActive ? "white" : "#3f51b5")};
  transition: 0.3s linear;
  background: ${props => (props.isActive ? "#1a237e" : "white")};
  user-select: none;
  &:hover {
    background: #bbdefb;
    color: white;
  }
`;

export const PaginationBtn = styled.button<{ disabled?: Boolean }>`
  border: 1px solid #e8e8e8;
  padding: 10px 15px;
  cursor: ${props => (props.disabled ? "context-menu" : "pointer")};
  color: ${props => (props.disabled ? "#d0d0d0" : "#3f51b5")};
  transition: 0.3s linear;
  background: ${props => (props.disabled ? "white" : "white")};
  user-select: none;

  ${props =>
    props.disabled
      ? ``
      : `&:hover {
        background: #bbdefb;
        color: white;
      }`}
`;
