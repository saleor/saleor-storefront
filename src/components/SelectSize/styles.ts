import styled from "styled-components";

// custom select
export const SelectWrapper = styled.div`
  position:relative;
  right: 0;
  display: flex;
  // flex-direction: column;
  width:100%;
  justify-content: flex-end;
  align-items:center;
  margin:20px 0;
`;

export const Title = styled.p`
  color:#888888;
  font-size: 14px;
  margin-right:10px;
`;


export const Select = styled.select`
  display: flex;
  outline: 0;
  border: 0 !important;
  background: #F1F5F5;
  position: relative;
  display: flex;
  width: 10em;
  height: 3em;
  line-height: 3;
  overflow: hidden;
  border-radius: 0.25em;
`;

export const Option = styled.option`
  display: flex;
  border: 1px;
`;