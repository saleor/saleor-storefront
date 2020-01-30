import { styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
`;

export const WishlistIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  font-size: ${props => `${props.theme.typography.smallFontSize}`};

  width: ${props => `${props.theme.iconButton.size}px`};
  height: ${props => `${props.theme.iconButton.size}px`};

  border-radius: 50%;
  border-width: 0;

  background-color: ${props => props.theme.colors.light};
  margin-right: 0.5rem;

  svg {
    display: block;
  }
`;
