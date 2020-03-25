import { styled } from "@styles";

export const Wrapper = styled.div`
  display: grid;
  min-height: 60px;
  max-height: min-content;
  width: 100%;
  grid-template-areas: "products price quantity totalPrice";
  grid-template-columns: 2.5fr 1.1fr 1.1fr 1.3fr;
  align-items: center;
  font-size: ${props => props.theme.typography.smallFontSize};
  color: rgba(40, 35, 74, 0.6);
`;

export const Column = styled.div`
  padding: 0.5rem;
`;
