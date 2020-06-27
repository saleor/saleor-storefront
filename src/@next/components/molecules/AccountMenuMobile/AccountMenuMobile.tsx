import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Icon } from "@components/atoms";
import { useHandlerWhenClickedOutside } from "@hooks";
import { commonMessages } from "@temp/intl";

import { Link } from "react-router-dom";
import * as S from "./styles";
import { IProps } from "./types";

export const AccountMenuMobile: React.FC<IProps> = ({
  links,
  active,
}: IProps) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const intl = useIntl();

  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setShowMenu(false);
  });

  const linkToMenuItem = (link: string) => {
    link = link
      .replace(/\//g, "")
      .replace("-", " ")
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
    let menuItem = link;
    /* eslint-disable default-case */
    switch (link) {
      case "Account":
        menuItem = intl.formatMessage(commonMessages.account);
        break;
      case "Order History":
        menuItem = intl.formatMessage(commonMessages.orderHistory);
        break;
      case "Address Book":
        menuItem = intl.formatMessage(commonMessages.addressBook);
        break;
    }
    return menuItem;
  };

  return (
    <S.Wrapper
      onClick={() => {
        setShowMenu(true);
      }}
      ref={setElementRef()}
    >
      {linkToMenuItem(active)}
      <Icon name="select_arrow" size={8} />
      {showMenu && (
        <S.Overlay>
          <S.MenuHeader>
            <FormattedMessage defaultMessage="Go to" />
          </S.MenuHeader>
          {links.map(link => {
            const menuItem = linkToMenuItem(link);
            return (
              <div
                onClick={evt => {
                  evt.stopPropagation();
                  setShowMenu(false);
                }}
                key={link}
              >
                <Link to={link}>
                  <S.MenuItem active={active === link}>
                    {menuItem}
                    <Icon name="select_arrow" size={8} />
                  </S.MenuItem>
                </Link>
              </div>
            );
          })}
        </S.Overlay>
      )}
    </S.Wrapper>
  );
};
