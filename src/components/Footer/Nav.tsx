import * as React from "react";

import { NavLink } from "..";
import { TypedSecondaryMenuQuery } from "./queries";

import "./scss/index.scss";

import useLocale from "@saleor/@next/hooks/useLocale";

const Nav : React.FC = () => {
 
    const { locale } = useLocale()
    const variables = {locale:locale.toUpperCase()}

    return (
      <footer className="footer-nav">
        <div className="container">
          <TypedSecondaryMenuQuery variables={variables}>
            {({ data }) => {
              return data.shop.navigation.secondary.items.map(item => (
                <div className="footer-nav__section" key={item.id}>
                  <h4 className="footer-nav__section-header">
                    <NavLink item={item} />
                  </h4>
                  <div className="footer-nav__section-content">
                    {item.children.map(subItem => (
                      <p key={subItem.id}><NavLink item={subItem} /></p>
                    ))}
                  </div>
                </div>
              ));
            }}
          </TypedSecondaryMenuQuery>
        </div>
      </footer>
    );
}

export default Nav;