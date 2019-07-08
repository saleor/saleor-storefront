import { styled } from "@styles";

const horizontalPadding = "2rem";

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Content = styled.div`
  padding: 4rem ${horizontalPadding} 1.8rem ${horizontalPadding};
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.baseFont};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  text-transform: uppercase;
  padding: 1.8rem ${horizontalPadding} 1.4rem ${horizontalPadding};
  margin-bottom: 1px;
  border-bottom: ${props => `1px solid ${props.theme.colors.light}`};
  p {
    margin-right: auto;
  }
`;

export const CloseBtn = styled.button``;

//     .modal {
//         &__lead {
//           color: rgba($base-font-color, 0.6);
//           font-size: $h3-font-size;
//           font-weight: 900;
//           padding: $spacer 0;
//           text-transform: uppercase;
//         }
//       }
