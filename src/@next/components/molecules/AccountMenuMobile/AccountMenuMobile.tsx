import Link from "next/link";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Icon } from "@components/atoms";
import { useHandlerWhenClickedOutside } from "@hooks";
import { paths } from "@paths";
import { commonMessages } from "@temp/intl";

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

  const linkToMenuItem = (link: string) =>
    ({
      [paths.account]: intl.formatMessage(commonMessages.account),
      [paths.accountOrderHistory]: intl.formatMessage(
        commonMessages.orderHistory
      ),
      [paths.accountAddressBook]: intl.formatMessage(
        commonMessages.addressBook
      ),
    }[link]);

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
          {links.map(link => (
            <div
              onClick={evt => {
                evt.stopPropagation();
                setShowMenu(false);
              }}
              key={link}
            >
              <Link href={link}>
                <a>
                  <S.MenuItem active={active === link}>
                    {linkToMenuItem(link)}
                    <Icon name="select_arrow" size={8} />
                  </S.MenuItem>
                </a>
              </Link>
            </div>
          ))}
        </S.Overlay>
      )}
    </S.Wrapper>
  );
};
