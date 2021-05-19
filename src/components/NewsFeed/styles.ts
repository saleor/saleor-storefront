import { styled } from "@styles";

export const Status = styled.input`
  border: none;
  width: 100%;
  padding: 12px;
  font-size: 18px;
  outline: none;
`;

export const WrapperStatus = styled.div`
  display: grid;
  grid-template-columns: 0fr 3fr;
  width: auto;
  height: auto;
  margin: 15px 0px 10px 0px;
`;

export const BtnUpStatus = styled.button`
  border: 1px solid transparent;
  padding: 12px 20px;
  background-color: #ff6a00;
  color: white;
  border-radius: 25px;
  font-weight: bold;
  font-size: 15px;
`;

export const IMG = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
