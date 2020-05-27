import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/Header/PageHeader";
import { SubHeader } from "../../components/Collection/SubHeader";
import "./scss/index.scss";

const Page = ({ data, history }) => {
  const handleBack = () => {
    history.push("/");
  };

  return (
    <div className="divImg sample-page">
      <PageHeader
        back={true}
        cart={true}
        search={true}
        handleClick={handleBack}
      />

      <SubHeader title="Samples" />

      <div className="wrapper-img">
        {data.products.edges.map(
          (
            { node: { name, id, pricing, thumbnail, variants, collections } },
            idx
          ) => (
            <div className="wrapper-img-main" key={idx}>
              <div className="wrapper-img-main-inner noBorder">
                <div className="wrapper-img-main-inner--header">
                  <span>{name}</span>
                </div>
                <div className="wrapper-img-main-inner--img">
                  {collections[0] ? (
                    <Link
                      to={`/collections/cabinets/${collections[0].id}/${collections[0].slug}`}
                    >
                      <img src={thumbnail.url} id={id} key={idx} />
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
                <div className="wrapper-img-main-inner--price">
                  {pricing.priceRange.start.gross.amount !==
                    pricing.priceRange.start.net.amount && (
                    <span className="old-price">
                      <del>${pricing.priceRange.start.gross.amount}</del>
                    </span>
                  )}
                  <span className="new-price">
                    ${pricing.priceRange.start.net.amount}
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Page;
