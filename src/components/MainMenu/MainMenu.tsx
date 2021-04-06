import { useAuth, useCart } from "@saleor/sdk";
import classNames from "classnames";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-media";
import ReactSVG from "react-svg";
import Search from "@temp/components/OverlayManager/Search";

import { DemoBanner } from "@components/atoms";
import { paths } from "@paths";
import { commonMessages } from "@temp/intl";

import cartImg from "../../images/cart.svg";
import logoImg from "../../images/logo.svg";
import userImg from "../../images/user.svg";
import {
  MenuDropdown,
  Offline,
  Online,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "..";

import "./scss/index.scss";
import {
  mediumScreen,
  smallScreen,
} from "../../globalStyles/scss/variables.scss";

interface MainMenuProps {
  demoMode: boolean;
}

const MainMenu: React.FC<MainMenuProps> = ({ demoMode }) => {
  const overlayContext = useContext(OverlayContext);

  const { user, signOut } = useAuth();
  const { items } = useCart();

  const handleSignOut = () => {
    signOut();
  };

  const cartItemsQuantity =
    (items &&
      items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;

  const [activeDropdown, setActiveDropdown] = useState<string>(undefined);

  useEffect(() => {
    if (activeDropdown) {
      overlayContext.show(OverlayType.mainMenuNav, OverlayTheme.modal);
    } else {
      overlayContext.hide();
    }
  }, [activeDropdown]);

  return (
    <header
      className={classNames({
        "header-with-dropdown": !!activeDropdown,
      })}
    >
      {demoMode && <DemoBanner />}
      <div className="container">
        <nav className="main-menu" id="header">
          <div className="main-menu__left">
            {/* <TypedMainMenuQuery
            renderOnError
            displayLoader={false}
            variables={{
              channel: channelSlug,
              slug: "navbar",
            }}
          >
            {({ data }) => {
              const items = maybe(() => data.menu.items, []);

              return (
                <ul>
                  <Media
                    query={{ maxWidth: mediumScreen }}
                    render={() => (
                      <li
                        data-test="toggleSideMenuLink"
                        className="main-menu__hamburger"
                        onClick={() =>
                          overlayContext.show(
                            OverlayType.sideNav,
                            OverlayTheme.left,
                            { data: items }
                          )
                        }
                      >
                        <ReactSVG
                          path={hamburgerImg}
                          className="main-menu__hamburger--icon"
                        />
                        <ReactSVG
                          path={hamburgerHoverImg}
                          className="main-menu__hamburger--hover"
                        />
                      </li>
                    )}
                  />
                  <Media
                    query={{ minWidth: mediumScreen }}
                    render={() =>
                      items.map(item => {
                        const hasSubNavigation = !!item?.children?.length;
                        return (
                          <li
                            data-test="mainMenuItem"
                            className="main-menu__item"
                            key={item.id}
                          >
                            <NavDropdown
                              overlay={overlayContext}
                              showDropdown={
                                activeDropdown === item.id && hasSubNavigation
                              }
                              onShowDropdown={() =>
                                showDropdownHandler(item.id, hasSubNavigation)
                              }
                              onHideDropdown={hideDropdownHandler}
                              {...item}
                            />
                          </li>
                        );
                      })
                    }
                  />
                  <Online>
                    <Media
                      query={{ maxWidth: smallScreen }}
                      render={() => (
                        <>
                          {user ? (
                            <MenuDropdown
                              suffixClass="__rightdown"
                              head={
                                <li className="main-menu__icon main-menu__user--active">
                                  <ReactSVG path={userImg} />
                                </li>
                              }
                              content={
                                <ul className="main-menu__dropdown">
                                  <li data-test="mobileMenuMyAccountLink">
                                    <Link href={paths.account}>
                                      <a>
                                        <FormattedMessage
                                          {...commonMessages.myAccount}
                                        />
                                      </a>
                                    </Link>
                                  </li>
                                  <li data-test="mobileMenuOrderHistoryLink">
                                    <Link href={paths.accountOrderHistory}>
                                      <a>
                                        <FormattedMessage
                                          {...commonMessages.orderHistory}
                                        />
                                      </a>
                                    </Link>
                                  </li>
                                  <li data-test="mobileMenuAddressBookLink">
                                    <Link href={paths.accountAddressBook}>
                                      <a>
                                        <FormattedMessage
                                          {...commonMessages.addressBook}
                                        />
                                      </a>
                                    </Link>
                                  </li>
                                  <li
                                    onClick={handleSignOut}
                                    data-test="mobileMenuLogoutLink"
                                  >
                                    <FormattedMessage
                                      {...commonMessages.logOut}
                                    />
                                  </li>
                                </ul>
                              }
                            />
                          ) : (
                            <li
                              data-test="mobileMenuLoginLink"
                              className="main-menu__icon"
                              onClick={() =>
                                overlayContext.show(
                                  OverlayType.login,
                                  OverlayTheme.left
                                )
                              }
                            >
                              <ReactSVG path={userImg} />
                            </li>
                          )}
                        </>
                      )}
                    />
                  </Online>
                </ul>
              );
            }}
          </TypedMainMenuQuery> */}
            <Link href={paths.home}>
              <a>
                <ReactSVG path={logoImg} />
              </a>
            </Link>
          </div>

          <div className="main-menu__center">
            <Search />
          </div>

          <div className="main-menu__right">
            <ul>
              <Online>
                <Media
                  query={{ minWidth: smallScreen }}
                  render={() => (
                    <>
                      {user ? (
                        <MenuDropdown
                          head={
                            <li className="main-menu__icon main-menu__user--active">
                              <ReactSVG path={userImg} />
                            </li>
                          }
                          content={
                            <ul className="main-menu__dropdown">
                              <li data-test="desktopMenuMyAccountLink">
                                <Link href={paths.account}>
                                  <a>
                                    <FormattedMessage
                                      {...commonMessages.myAccount}
                                    />
                                  </a>
                                </Link>
                              </li>
                              <li data-test="desktopMenuOrderHistoryLink">
                                <Link href={paths.accountOrderHistory}>
                                  <a>
                                    <FormattedMessage
                                      {...commonMessages.orderHistory}
                                    />
                                  </a>
                                </Link>
                              </li>
                              <li data-test="desktopMenuAddressBookLink">
                                <Link href={paths.accountAddressBook}>
                                  <a>
                                    <FormattedMessage
                                      {...commonMessages.addressBook}
                                    />
                                  </a>
                                </Link>
                              </li>
                              <li
                                onClick={handleSignOut}
                                data-test="desktopMenuLogoutLink"
                              >
                                <FormattedMessage {...commonMessages.logOut} />
                              </li>
                            </ul>
                          }
                        />
                      ) : (
                        <li
                          data-test="desktopMenuLoginOverlayLink"
                          className="main-menu__icon"
                          onClick={() =>
                            overlayContext.show(
                              OverlayType.login,
                              OverlayTheme.right
                            )
                          }
                        >
                          <ReactSVG path={userImg} />
                        </li>
                      )}
                    </>
                  )}
                />
                <li
                  data-test="menuCartOverlayLink"
                  className="main-menu__icon main-menu__cart"
                  onClick={() => {
                    overlayContext.show(OverlayType.cart, OverlayTheme.right);
                  }}
                >
                  <ReactSVG path={cartImg} />
                  {cartItemsQuantity > 0 ? (
                    <span className="main-menu__cart__quantity">
                      {cartItemsQuantity}
                    </span>
                  ) : null}
                </li>
              </Online>
              <Offline>
                <li className="main-menu__offline">
                  <Media
                    query={{ minWidth: mediumScreen }}
                    render={() => (
                      <span>
                        <FormattedMessage defaultMessage="Offline" />
                      </span>
                    )}
                  />
                </li>
              </Offline>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default MainMenu;
