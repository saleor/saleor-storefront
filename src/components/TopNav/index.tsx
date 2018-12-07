import * as React from 'react';
import { Query } from 'react-apollo';
import Media from 'react-media';

import { Error } from "../Error";
import { GET_MAIN_MENU } from './queries';

import { mediumScreen } from "../App/scss/variables.scss";
import TopNavDropDown from '../TopNavDropDown';

const TopNav: React.SFC = () => (
  <Media
    query={{ minWidth: mediumScreen }}
    render={() => (
      <Query
        query={GET_MAIN_MENU}
        fetchPolicy="cache-and-network"
        errorPolicy="all"
      >
        {({ loading, error, data }) => {
          if (loading) {
            return null;
          }

          if (error && !data) {
            return <Error error={error.message} />;
          }

          return data.shop.navigation.main.items
            .map((item) => (
              <li className="main-menu__item" key={item.id}>
                <TopNavDropDown {...item} />
              </li>
            ));
        }}
      </Query>
    )}
  />
);

export default TopNav;
