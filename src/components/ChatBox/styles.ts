import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 40px;
  display: flex;
  align-items: flex-end;
  z-index: 10;
`;

export const Circle = styled.div`
  width: 50px;
  height: 50px;
  background: red;
  border-radius: 50%;
  margin-left: 1rem;
  cursor: pointer;
  position: relative;

  &:before {
    content: "Message Store";
    color: #fff;
    position: absolute;
    top: -60%;
    font-size: 0.8rem;
    text-align: center;
    padding: 0;
    left: -50%;
    margin: 0;
    width: 100px;
    background: #ff6a00;
    height: fit-content;
    z-index: 300;
  }
  &:after {
    content: "";
    position: absolute;
    top: -20%;
    padding: 0;
    left: 26%;
    margin: 0;
    // width: 20px;
    // background: blue;
    // height: 20px;
    z-index: 300;

    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 15px solid #ff6a00;
  }
`;

export const Wrapper = styled.div<{ stt: boolean }>`
  background: #fff;
  border-radius: 1rem;
  overflow: hidden;
  display: ${props => props.stt && "none"};
  box-shadow: -1px 0px 24px -7px #00000050;
  z-index: 200;
  @media (max-width: 519px) {
    min-height: 200px;
    width: 267px;
  }
  @media (min-width: 520px) {
    min-height: 250px;
    width: 300px;
  }
  @media (min-width: 720px) {
    min-height: 250px;
    width: 300px;
  }
  @media (min-width: 992px) {
    min-height: 400px;
    width: 350px;
  }
  @media (min-width: 1280px) {
    min-height: 500px;
    width: 350px;
  }
`;

// detail
export const DetailWrap = styled.div`
  padding: 1rem 0.875rem;
`;

export const Detail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const ProductName = styled.a`
  text-decoration: none;
  color: #5d5d5d;
  font-size: 0.875rem;
`;

export const ButtonBox = styled.div`
  display: flex;
`;

export const ButtonDetail = styled.a`
  text-decoration: none;
  font-size: 1rem;
  background: #d5d5d5;
  padding: 0.5rem 0.8rem;
  border-radius: 0.8rem;
  flex: 1;
  text-align: center;
  margin: 0 10px;
`;

export const InfoWrap = styled.div``;

//
// header

export const Head = styled.div`
  width: 100%;
  // background: red;
  height: 10%;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.875rem;
  box-sizing: border-box;
  box-shadow: 1px -5px 9px 2px #000;
`;

export const AvatarBox = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
`;

export const Avatar = styled.img`
  object-fit: cover;
  width: 100%;
`;

export const Name = styled.span`
  font-weight: 600;
`;

export const OptionBox = styled.div`
  flex: 1;
  color: red;
  display: flex;
  justify-content: flex-end;
`;

export const OptionItem = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: poiter;
  // background: red;
  margin-left: 10px;
`;
//

// content

export const Content = styled.div`
  width: 100%;
  background: #e6f3f6;
  padding: 0.5rem 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
  @media (max-width: 519px) {
    min-height: 200px;
  }
  @media (min-width: 520px) {
    min-height: 200px;
  }
  @media (min-width: 720px) {
    min-height: 200px;
  }
  @media (min-width: 992px) {
    min-height: 250px;
  }
  @media (min-width: 1280px) {
    min-height: 300px;
  }
`;

export const InComing = styled.p`
  background: #fff;
  margin: 0.5rem;
  padding: 0.75rem;
  width: fit-content;
`;

export const OutComing = styled.p`
  background: #fff;
  margin: 0.5rem;
  padding: 0.75rem;
  width: fit-content;
  align-self: flex-end;
`;

//
// chat box
export const ChatBox = styled.div`
  width: 100%;
  // background: red;
  height: 10%;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.5rem;
  box-sizing: border-box;
`;

export const InputWrap = styled.form`
  display: flex;
  width: 100%;
  background: #f0f2f5;
  padding: 0.5rem 0.8rem;
  border-radius: 1rem;
  box-sizing: border-box;
`;

export const Input = styled.textarea`
  padding-top: 5px;
  height: 24px;
  width: 100%;
  outline: none;
  border: none;
  background: #edf0f5;
  resize: none;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #edf0f5;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
`;

export const Sendbtn = styled.img`
  width: 25px;
  height: 25px;
`;
