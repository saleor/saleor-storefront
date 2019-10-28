import { styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #130d44;
  padding: 1.5em;
  max-height: 60px;
  font-size: 12;
`;

export const Link = styled.a`
  color: white;
  font-weight: 600;
  text-transform: uppercase;
`;

export const TextEmphasis = styled.span`
  color: #00c5aa;
`;
