import React from "react";
import Media from "react-media";
import ReactSVG from "react-svg";
import {
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "..";
import {
  mediumScreen,
} from "../../globalStyles/scss/variables.scss";
import searchImg from "../../images/search-icon.svg";
import "./scss/index.scss";

const MainMenu: React.FC = () => {
  return (
    <OverlayContext.Consumer>
      {overlayContext => (
        <nav className="main-menu" id="header">
          <div className="main-menu__right">
            <ul>
              <li
                className="main-menu__search"
                onClick={() =>
                  overlayContext.show(OverlayType.search, OverlayTheme.right)
                }
              >
                <Media
                  query={{ minWidth: mediumScreen }}
                  render={() => <span>Search</span>}
                />
                <ReactSVG path={searchImg} />
              </li>
            </ul>
          </div>
        </nav>
      )}
    </OverlayContext.Consumer>
  );
};

export default MainMenu;
