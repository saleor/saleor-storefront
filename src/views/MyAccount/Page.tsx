import * as React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/Header/PageHeader";
import logoutExit from "../../images/logout_exit.svg";
import wishlist from "../../images/wishlist.svg";
import orderImg from "../../images/my-orders.svg";
import profile from "../../images/profile.svg";
import creditCard from "../../images/credit_card.svg";
import "./scss/index.scss";

export const Paths = [
  {
    path: "/my-wishlist",
    text: "My WishList",
    image: wishlist,
  },
  {
    path: "/my-orders",
    text: "My Orders",
    image: orderImg,
  },
  {
    path: "/account-info",
    text: "Account Information",
    image: profile,
  },
  {
    path: "/payment-info",
    text: "Payment Information",
    image: creditCard,
  },
  {
    path: "/logout",
    text: "Logout",
    image: logoutExit,
  },
];

export const Page = props => {
  const handleClick = () => {
    props.history.goBack();
  };

  return (
    <div className="account-page-wrapper">
      <PageHeader
        back={true}
        cart={false}
        search={true}
        handleClick={handleClick}
      />
      <div>
        <div className="myAccount-wrapper">
          {Paths.map((path, i) => (
            <Link
              to={`${path.path}`}
              key={i}
              className="myAccount-wrapper-link"
            >
              <img src={path.image} />
              <button type="button" className="myAccount-wrapper-link--btn">
                {path.text}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
