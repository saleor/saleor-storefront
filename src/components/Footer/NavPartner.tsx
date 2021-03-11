import * as React from "react";

import { NavLink } from "..";
import { TypedSecondaryMenuQueryPartner } from "./queries";

import "./scss/index.scss";
import LocaleSelect from "./LocaleSelect";

class Nav extends React.PureComponent {
  render() {
    return (
      <footer className="footer-nav">
        <div className="container">
          <TypedSecondaryMenuQueryPartner>
            {({ data }) => {
              return data.menu.items.map(item => (
                <div className="footer-nav__section" key={item.id}>
                  <h4 className="footer-nav__section-header">
                    <NavLink item={item} />
                  </h4>
                  <div className="footer-nav__section-content">
                    {item.children.map(subItem => (
                      <p key={subItem.id}>
                        <NavLink item={subItem} />
                      </p>
                    ))}
                  </div>
                </div>
              ));
            }}
          </TypedSecondaryMenuQueryPartner>
          <LocaleSelect />
        </div>
      </footer>
    );
  }
}

export default Nav;
