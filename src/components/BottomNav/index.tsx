import * as React from "react";
import { Query } from "react-apollo";

import { Error } from "../Error";
import Loader from "../Loader";
import { generateNavLink } from "../TopNavDropDown";
import { GET_SECONDARY_MENU } from "./queries";
import { BottomMenuSubItem } from "./types/BottomMenuSubItem";

const BottomNav: React.SFC = () => (
  <Query
    query={GET_SECONDARY_MENU}
    fetchPolicy="cache-and-network"
    errorPolicy="all"
  >
    {({ loading, error, data }) => {
      if (loading) {
        return <Loader />;
      }

      if (error && !data) {
        return <Error error={error.message} />;
      }

      return data.shop.navigation.secondary.items.map(item => (
        <div className="footer__menu-section" key={item.id}>
          <h4 className="footer__menu-section-header">
            {generateNavLink(
              item.name,
              item.url,
              item.category,
              item.collection,
              item.page
            )}
          </h4>
          <div className="footer__menu-section-content">
            {item.children.map(subItem => (
              <p key={subItem.id}>
                {generateNavLink(
                  subItem.name,
                  subItem.url,
                  subItem.category,
                  subItem.collection,
                  subItem.page
                )}
              </p>
            ))}
          </div>
        </div>
      ));
    }}
  </Query>
);

export default BottomNav;
