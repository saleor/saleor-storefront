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
  object-fit: cover;
`;

export const WrapperImageUpload = styled.div`
<<<<<<< HEAD
  width: 100%;
  // height: 297px;
=======
  // width: 527px;
  height: 297px;
>>>>>>> 203e964a6013dd24103e9c0f0b2309bfc744b884
  margin: 10px 0px 12px 0px;
`;

export const Reaction = styled.img`
  color: #ff6a00;
  width: 20px;
  cursor: pointer;
`;

export const ActionStatus = styled.img`
  color: #ff6a00;
  width: 20px;
`;

export const PrivacyStatus = styled.img`
  color: #ff6a00;
  width: 20px;
  vertical-align: bottom;
`;

export const WrapperPrivacy = styled.div`
  padding: 20px 0px;
`;

export const BtnPrivacy = styled.button`
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

export const TextPrivacy = styled.span`
  color: #ff6a00;
  font-weight: bold;
`;

export const WrapperActionStatus = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border: 1px solid;
  border-radius: 50px;
  outline: none;
`;

export const WrapperAvatar = styled.div`
  width: 48px;
  height: 48px;
`;

export const WrapPost = styled.div`
  text-align: right;
`;

export const WrapActionStatus = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

export const WrapMaincontent = styled.div`
  display: grid;
  justify-content: center;
`;
