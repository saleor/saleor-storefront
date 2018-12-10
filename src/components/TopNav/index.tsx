import * as React from "react";
import Media from "react-media";

import TopNavDropDown from "../TopNavDropDown";
import { TypedMainMenuQuery } from "./queries";

import { mediumScreen } from "../App/scss/variables.scss";

class TopNav extends React.PureComponent {
  render() {
    return (
      <Media
        query={{ minWidth: mediumScreen }}
        render={() => (
          <TypedMainMenuQuery displayLoader={false}>
            {({ data }) => {
              return data.shop.navigation.main.items.map(item => (
                <li className="main-menu__item" key={item.id}>
                  <TopNavDropDown {...item} />
                </li>
              ));
            }}
          </TypedMainMenuQuery>
        )}
      />
    );
  }
}

export default TopNav;
