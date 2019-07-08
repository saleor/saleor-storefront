import { styled } from "@styles";

const horizontalPadding = "2rem";

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const Content = styled.div`
  padding: 4rem ${horizontalPadding} 1.8rem ${horizontalPadding};
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
