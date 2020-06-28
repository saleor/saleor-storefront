import React from "react";
import Media from "react-responsive";
import { Transition } from "react-transition-group";

import { Icon } from "@components/atoms";
import { largeScreen } from "@styles/constants";
import LogoSmall from "images/logo-small.svg";

import { Overlay } from "..";
import * as S from "./styles";
import { IProps, IState } from "./types";

const TopBar: React.FC<{ onHide: () => void }> = ({ children, onHide }) => (
  <S.Bar>
    {children}
    <S.CloseIconWrapper onClick={onHide}>
      <Icon name="horizontal_line" size={22} />
    </S.CloseIconWrapper>
  </S.Bar>
);

const MenuItem: React.FC<{
  name: string;
  onClick: () => void;
}> = ({ name, onClick }) => {
  return (
    <S.Item>
      <S.NavButton onClick={onClick}>
        <span>{name}</span>
        <S.SubcategoryIcon>
          <Icon name="subcategories" size={10} />
        </S.SubcategoryIcon>
      </S.NavButton>
    </S.Item>
  );
};

// Animation settings
const duration = 250;
const defaultStyle = {
  left: "100%",
  transition: `left ${duration}ms ease-in-out`,
};
const transitionStyles = {
  entered: { left: 0 },
  entering: { left: "100%" },
  exited: { left: "100%" },
  exiting: { left: "100%" },
  unmounted: { left: "100%" },
};

export const SideNavbar: React.FC<IProps> = ({
  show,
  onHide,
  items,
  target,
}: IProps) => {
  const [view, _setView] = React.useState<IState>({
    buffer: { index: null, depth: null },
    depth: null,
    index: null,
  });

  const setView = React.useCallback((state: Partial<IState>) => {
    _setView(view => ({
      ...view,
      ...state,
      buffer: { ...view.buffer, ...state },
    }));
  }, []);

  const handleHide = () => onHide(false);

  return (
    <Overlay
      position="left"
      show={show}
      hide={handleHide}
      target={target}
      testingContext="navigationMenu"
    >
      <S.Wrapper>
        <S.Menu>
          <TopBar onHide={handleHide}>
            <S.LogoWrapper path={LogoSmall} />
          </TopBar>
          <S.Link to="/">Home</S.Link>
          {items.map((item, index) =>
            item.children.length > 0 ? (
              <MenuItem
                key={index}
                onClick={() => {
                  setView({ index });
                }}
                name={item.name}
              />
            ) : (
              <S.NavLink fullWidth type="side" item={item} />
            )
          )}
          <Media maxWidth={largeScreen}>
            <S.Item>
              <S.Link to="/wishlist">
                <S.IconWrapper>
                  <Icon name="heart" size={24} />
                </S.IconWrapper>
                <span>my wishlist</span>
              </S.Link>
            </S.Item>
            <S.Item>
              <S.Link to="/account">
                <S.IconWrapper>
                  <Icon name="profile" size={24} />
                </S.IconWrapper>
                <span>my profile</span>
              </S.Link>
            </S.Item>
            <S.Item>
              <S.Link to="/">english</S.Link>
            </S.Item>
          </Media>
        </S.Menu>
        <Transition
          in={view.buffer.index !== null}
          // https://github.com/reactjs/react-transition-group/issues/284
          timeout={{ enter: 0, exit: duration }}
          onExited={() => setView({ index: null, depth: null })}
          unmountOnExit
        >
          {state => (
            <S.Menu
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              <TopBar onHide={handleHide}>
                <S.BackButton
                  onClick={() => {
                    _setView(view => ({
                      ...view,
                      buffer: { depth: null, index: null },
                    }));
                  }}
                >
                  <S.IconWrapper>
                    <Icon name="arrow_back" size={22} />
                  </S.IconWrapper>
                  <span>{items[view.index!].name}</span>
                </S.BackButton>
              </TopBar>
              {items[view.index!].children.map((item, depth) =>
                item.children.length > 0 ? (
                  <MenuItem
                    key={depth}
                    onClick={() => {
                      setView({ depth });
                    }}
                    name={item.name}
                  />
                ) : (
                  <S.NavLink fullWidth type="side" item={item} />
                )
              )}
            </S.Menu>
          )}
        </Transition>
        <Transition
          in={view.buffer.index !== null && view.buffer.depth !== null}
          // https://github.com/reactjs/react-transition-group/issues/284
          timeout={{ enter: 0, exit: duration }}
          onExited={() => setView({ depth: null })}
          unmountOnExit
        >
          {state => (
            <S.Menu
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              <TopBar onHide={handleHide}>
                <S.BackButton
                  onClick={() => {
                    _setView(view => ({
                      ...view,
                      buffer: { ...view.buffer, depth: null },
                    }));
                  }}
                >
                  <S.IconWrapper>
                    <Icon name="arrow_back" size={22} />
                  </S.IconWrapper>
                  <span>{items[view.index!].children[view.depth!].name}</span>
                </S.BackButton>
              </TopBar>
              {items[view.index!].children[view.depth!].children.map(
                (item, i) => (
                  <S.NavLink key={i} fullWidth type="side" item={item} />
                )
              )}
            </S.Menu>
          )}
        </Transition>
      </S.Wrapper>
    </Overlay>
  );
};
