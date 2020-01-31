import { styled } from "@styles";

export const Wrapper = styled.div<{ added: boolean }>`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;

  svg {
    position: relative;
    top: ${props => (props.added ? `0.5` : `0.8`)}rem;
    left: ${props => (props.added ? `0.4` : `0.6`)}rem;
  }

  :hover {
    svg {
      top: 0.5rem;
      left: 0.4rem;

      path {
        fill: ${props => props.theme.colors.activeMenuOption};
      }
    }
  }
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
