import { media, styled } from "@styles";

export const Wrapper = styled.div`
  margin: 30px 0 100px 0;
`;

export const Breadcrumbs = styled.div``;

export const Title = styled.div`
  margin-top: 80px;
  margin-bottom: 60px;
`;

export const CartHeader = styled.div`
  ${media.mediumScreen`
    display: none;
  `};
`;
export const CartFooter = styled.div``;
export const Cart = styled.div`
  border-top: 1px solid rgba(50, 50, 50, 0.1);
`;
export const ProceedButton = styled.div`
  text-align: right;
  margin-top: 40px;
`;
