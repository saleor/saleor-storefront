import * as React from "react";
import ReactSVG from "react-svg";
import AccountIcon from "../../images/account-icon.svg";
import CartIcon from "../../images/cart-icon.svg";
import HomeIcon from "../../images/home-icon.svg";
import MoreIcon from "../../images/more-icon.svg";
import { Link } from "react-router-dom";
import "./scss/index.scss";

const Footer: React.FC = () => {
  const path = window.location.pathname;

  return (
    <div className="footer" id="footer">
      <div className="footer-small">
        <div
          className={`footer-small__icon ${
            path === "/" ? "footer-small__icon-selected" : ""
          }`}
        >
          <Link to="/">
            <ReactSVG className="footer-icon" path={HomeIcon} />
            <span className="footer-small__icon-name">Home</span>
          </Link>
        </div>

        <div
          className={`footer-small__icon ${
            path === "/cart" ? "footer-small__icon-selected" : ""
          }`}
        >
          <Link to="/cart">
            <ReactSVG className="footer-icon" path={CartIcon} />
            <span className="footer-small__icon-name">Cart</span>
          </Link>
        </div>

        <div
          className={`footer-small__icon ${
            path === "/my-account" ? "footer-small__icon-selected" : ""
          }`}
        >
          <Link to="/my-account">
            <ReactSVG className="footer-icon" path={AccountIcon} />
            <span className="footer-small__icon-name">Account</span>
          </Link>
        </div>

        <div className="footer-small__icon">
          <ReactSVG className="footer-icon" path={MoreIcon} />
          <span className="footer-small__icon-name">More</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
