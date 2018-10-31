import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import urljoin from "url-join";

import { Button } from "..";
import { STATIC_PAGES } from "../../core/config";
import { Error } from "../Error";
import Loader from "../Loader";
import { GET_CATEGORIES } from "../NavigationOverlay/queries";

import "./scss/index.scss";

const DASHBOARD_URL = urljoin(process.env.BACKEND_URL || "", "/dashboard/");

const Footer: React.SFC = () => (
  <div className="footer" id="footer">
    <div className="footer__newsletter">
      <div className="container">
        <h4>Subscribe to our newsletter to recieve new information</h4>
        <Button secondary>Sign up</Button>
      </div>
    </div>
    <div className="footer__favicons container">
      <ReactSVG
        path={require("../../images/facebook-icon.svg")}
        className="footer__favicons__icon"
      />
      <ReactSVG
        path={require("../../images/twitter-icon.svg")}
        className="footer__favicons__icon"
      />
      <ReactSVG
        path={require("../../images/instagram-icon.svg")}
        className="footer__favicons__icon"
      />
      <ReactSVG
        path={require("../../images/youtube-icon.svg")}
        className="footer__favicons__icon"
      />
    </div>
    <footer className="footer__menu">
      <div className="container">
        <div>
          <h4>Collections</h4>
          <Query
            query={GET_CATEGORIES}
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
              return data.categories.edges.map(category => (
                <p key={category.node.id}>{category.node.name}</p>
              ));
            }}
          </Query>
        </div>
        <div>
          <h4>Saleor</h4>
          {STATIC_PAGES.map(page => (
            <p key={page.label}>
              <Link to={page.url}>{page.label}</Link>
            </p>
          ))}
          <p>
            <a href={DASHBOARD_URL} target="_blank">
              Dashboard
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
