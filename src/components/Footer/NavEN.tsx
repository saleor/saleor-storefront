import * as React from "react";

import { NavLink } from "..";
import { TypedSecondaryMenuQueryEN } from "./queries";

import "./scss/index.scss";
import LocaleSelect from "./LocaleSelect";

class NavEN extends React.PureComponent {
  render() {
    return (
      <footer className="footer-nav">
        <div className="container">
          <TypedSecondaryMenuQueryEN>
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
          </TypedSecondaryMenuQueryEN>
          <LocaleSelect />
        </div>
      </footer>
    );
  }
}

export default NavEN;
