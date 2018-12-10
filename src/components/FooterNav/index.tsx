import * as React from "react";

import { generateNavLink } from "../TopNavDropDown";
import { TypedSecondaryMenuQuery } from "./queries";

import "./scss/index.scss";

class FooterNav extends React.PureComponent {
  render() {
    return (
      <footer className="footer-nav">
        <div className="container">
          <TypedSecondaryMenuQuery>
            {({ data }) => {
              return data.shop.navigation.secondary.items.map(item => (
                <div className="footer-nav__section" key={item.id}>
                  <h4 className="footer-nav__section-header">
                    {generateNavLink(item)}
                  </h4>
                  <div className="footer-nav__section-content">
                    {item.children.map(subItem => (
                      <p key={subItem.id}>{generateNavLink(subItem)}</p>
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
}

export default FooterNav;
