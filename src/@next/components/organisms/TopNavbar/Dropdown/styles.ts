import { NavLink } from "@components/atoms";
import { styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  padding: 20px 40px;
`;

export const Rows = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
`;

export const Side = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 20%;
`;

export const RowItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`;

export const SubLink = styled(NavLink)<{ light?: boolean }>`
  text-transform: capitalize;
  padding-bottom: 20px;
  ${({ light, theme }) =>
    light &&
    `
    color: ${theme.colors.lightFont};
    font-size: ${theme.typography.smallFontSize};
  `}
`;
