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

export const Comment = styled.input`
  width: 100%;
  border: none;
  padding: 10px;
  font-size: 15px;
  outline: none;
`;

export const ImageUpLoad = styled.img`
  width:100%
  height:100%
  border-radius: 15px
`;

export const WrapperImageUpload = styled.div`
  width: 527px;
  height: 297px;
  margin: 10px 0px 12px 0px;
`;

export const Reaction = styled.img`
  color: #ff6a00;
  width: 20px;
  cursor: pointer;
`;
