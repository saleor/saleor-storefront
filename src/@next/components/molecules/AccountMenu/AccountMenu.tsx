import Link from "next/link";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { paths } from "@paths";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";
import { IProps } from "./types";

export const AccountMenu: React.FC<IProps> = ({ links, active }: IProps) => {
  const intl = useIntl();
  return (
    <S.Wrapper>
      <S.MenuHeader>
        <FormattedMessage {...commonMessages.myAccount} />
      </S.MenuHeader>
      {links.map(link => {
        const text = {
          [paths.account]: intl.formatMessage(commonMessages.account),
          [paths.accountOrderHistory]: intl.formatMessage(
            commonMessages.orderHistory
          ),
          [paths.accountAddressBook]: intl.formatMessage(
            commonMessages.addressBook
          ),
        }[link];

        return (
          <Link
            href={link}
            key={link}
            data-test="accountMenuLink"
            data-test-id={link}
          >
            <a>
              <S.MenuItem active={active === link}>{text}</S.MenuItem>
            </a>
          </Link>
        );
      })}
    </S.Wrapper>
  );
};
