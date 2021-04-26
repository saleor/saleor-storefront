import { styled } from "@styles";

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const Content = styled.div<{ padding?: any }>`
  padding: ${({ theme: { spacing }, padding }) =>
    padding !== ""
      ? padding
      : `4rem ${spacing.gutter} 1.8rem ${spacing.gutter}`};
`;
