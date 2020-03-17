import { styled } from "@styles";

export const Wrapper = styled.div`
  display: grid;

  grid-template-columns: repeat(6fr, 4fr);
  grid-column-gap: 30px;
  grid-template-columns:
    "navigation cartSummary"
    "checkout cartSummary"
    "button cartSummary";
`;
