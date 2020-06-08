// This component relies on parts of the application that are
// are not yet implemented (ie wishlist)
// Replace it with MainMenu component once all the blocks are finished

import React from "react";
import Media from "react-responsive";

import { Icon, NavLink } from "@components/atoms";
import { largeScreen, smallScreen } from "@styles/constants";
import { maybe } from "@utils/misc";

import LogoSmall from "images/logo-small.svg";
import Logo from "images/logo.svg";

import { Dropdown } from "./Dropdown";
import * as S from "./styles";
import { IProps } from "./types";

const menuVisibleRatio = 0.8;
const getElementWidth = (node: Element) => node.scrollWidth;
const isMenuVisible = (node: Element) => {
  const wrapperWidth = node.scrollWidth;
  const child = node.lastElementChild;

  if (wrapperWidth > 0) {
    const childWidth = maybe(() => getElementWidth(child!), 0);

    if (childWidth / wrapperWidth < menuVisibleRatio) {
      return true;
    }
  }

  return false;
};

const useElementWidthChanged = (
  callback?: () => void
): [any, { width: number; node: Element | null }] => {
  const [width, setWidth] = React.useState(0);
  const nodeRef = React.useRef<Element | null>(null);
  let resizeTimer: any;

  const eventHandler = (_e: Event) => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newWidth = getElementWidth(nodeRef!.current!);
      if (width !== newWidth) {
        setWidth(getElementWidth(nodeRef!.current!));

        if (callback) {
          callback();
        }
      }
    }, 250);
  };

  const setRef = React.useCallback((node: Element | null) => {
    if (node !== null) {
      nodeRef.current = node;
      setWidth(getElementWidth(node));
      window.addEventListener("resize", eventHandler);
    }
  }, []);

  React.useEffect(() => {
    return () => {
      window.removeEventListener("resize", eventHandler);
    };
  }, []);

  return [setRef, { width, node: nodeRef.current }];
};

export const TopNavbar: React.FC<IProps> = ({ items }: IProps) => {
  const [navVisible, setNavVisible] = React.useState(false);
  const [setRef, { width, node }] = useElementWidthChanged();
  const [currentElement, setCurrentElement] = React.useState<number | null>(
    null
  );

  React.useEffect(() => {
    if (node) {
      setNavVisible(isMenuVisible(node));
    }
  }, [width]);

  return (
    <>
      <S.Wrapper data-test="topNavigation">
        <S.Navigation ref={setRef}>
          {!navVisible && (
            <S.Mobile>
              <li>
                <Icon name="hamburger" />
              </li>
            </S.Mobile>
          )}
          <S.Desktop style={{ visibility: navVisible ? "visible" : "hidden" }}>
            {/* get rid off any types when items is typed */}
            {items.map((item: any, index: any) => (
              <li key={item.id}>
                {item.children.length > 0 ? (
                  <S.Button onClick={() => setCurrentElement(index)}>
                    {item.name}
                  </S.Button>
                ) : (
                  <NavLink item={item} />
                )}
              </li>
            ))}
          </S.Desktop>
        </S.Navigation>
        <S.Center>
          <Media maxWidth={smallScreen}>
            <S.LogoWrapper path={LogoSmall} />
          </Media>
          <Media minWidth={smallScreen}>
            <S.LogoWrapper path={Logo} />
          </Media>
        </S.Center>
        <S.Actions>
          <Media minWidth={largeScreen}>
            <S.IconWrapper>
              <Icon name="profile" size={24} />
            </S.IconWrapper>
            <S.IconWrapper>
              <Icon name="heart" size={24} />
            </S.IconWrapper>
          </Media>
          <S.IconWrapper>
            <Icon name="cart" size={24} />
          </S.IconWrapper>
          <S.SearchButton>
            <Media minWidth={smallScreen}>
              <S.Text>SEARCH</S.Text>
            </Media>
            <Icon name="search" size={24} />
          </S.SearchButton>
        </S.Actions>
      </S.Wrapper>
      {currentElement !== null && (
        <Dropdown
          item={items[currentElement]}
          onHide={() => setCurrentElement(null)}
        />
      )}
    </>
  );
};
