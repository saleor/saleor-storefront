import { mediumScreen, smallScreen } from "@styles/constants";
import React from "react";
import Media from "react-responsive";

import { Icon, NavLink } from "@components/atoms";
import { maybe } from "@utils/misc";

import Logo from "images/logo.svg";
import { SideNavbar } from "../";
import * as S from "./styles";
import { IProps } from "./types";

const items = [
  {
    id: 123,
    name: "Element I",
    page: "/",
  },
  {
    id: 312,
    name: "Element II",
    page: "/wew",
  },
  {
    id: 412,
    name: "Element III",
    page: "/wew",
  },
];

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

export const TopNavbar: React.FC<IProps> = ({  }: IProps) => {
  const [navVisible, setNavVisible] = React.useState(false);
  const [sideMenuVisible, setSideMenuVisible] = React.useState(false);
  const [setRef, { width, node }] = useElementWidthChanged();

  React.useEffect(() => {
    if (node) {
      setNavVisible(isMenuVisible(node));
    }
  }, [width]);

  return (
    <>
      <SideNavbar
        show={sideMenuVisible}
        onHide={setSideMenuVisible}
        items={items}
      />
      <S.Wrapper>
        <S.Navigation ref={setRef}>
          {!navVisible && (
            <S.Mobile>
              <li>
                <Icon name="hamburger" />
              </li>
            </S.Mobile>
          )}
          <S.Desktop style={{ visibility: navVisible ? "visible" : "hidden" }}>
            {items.map(item => (
              <li key={item.id}>
                <NavLink item={item} />
              </li>
            ))}
          </S.Desktop>
        </S.Navigation>
        <S.Center>
          <S.LogoWrapper path={Logo} />
        </S.Center>
        <S.Actions>
          <Media minWidth={mediumScreen}>
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
    </>
  );
};
