import { styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 10px;
  min-height: 100vh;
  background: #f1f5f5;
  flex-wrap: wrap !important;
  margin-bottom: 2rem;

  @media (max-width: 1380px) {
    padding: 0 30px;
  }
  @media (max-width: 1024px) {
    padding: 0 20px;
  }
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  width: 100%;
`;

export const ListItem = styled.div`
  width: 20%;
  @media (max-width: 1600px) {
    width: 25%;
  }
  @media (max-width: 1368px) {
    width: 33.3%;
  }
  @media (max-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Loader = styled.div`
  text-align: center;
  margin: 2.5rem 0;
`;
