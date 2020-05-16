import topArrow from "images/arrow-down.svg";
import bottomArrow from "images/arrow-up.svg";
import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/Header/PageHeader";
import { useLocalStorage } from "../../@next/hooks/useLocalStorage";

export const Paths = [
  {
    path: "/samples",
    text: "View Samples",
  },
  {
    path: "/available-colors",
    text: "Available Colors",
  },
  {
    path: "/details",
    text: "View Details",
  },
  {
    path: "/specification",
    text: "Specification",
  },
  {
    path: "/cabinet-parts",
    text: "Items Included",
  },
];

const Page = props => {
  const { storedValue: show, setValue: showOverlay } = useLocalStorage(
    "show",
    "false"
  );
  const { data, history } = props;

  const handleOverlay = () => {
    showOverlay(!show);
  };

  const handleBack = () => {
    showOverlay(!show);
    history.push("/collections/cabinets");
  };

  return (
    <div
      style={{ backgroundImage: `url(${data.collection.backgroundImage.url})` }}
      className="divImg"
    >
      <PageHeader
        back={true}
        cart={true}
        search={true}
        handleClick={handleBack}
      />
      <div className="overlay-wrap">
        <div
          className={
            show
              ? "overlay-wrap--inner overlay-down-arrow-div"
              : "overlay-wrap--inner overlay-arrow-div"
          }
        >
          <div>
            <img
              src={show ? topArrow : bottomArrow}
              className="overlay-arrow"
              onClick={handleOverlay}
            />
          </div>
          <div
            className={
              show ? "overlay-height overlay-height-down" : "overlay-height"
            }
          >
            <div className="overlay-heading">
              <span>{data.collection.name}</span>
              <span>$81,318</span>
            </div>
            <div className="overlay-button-list">
              {Paths.map((path, i) => (
                <Link
                  to={`/collections/cabinets/${data.collection.id}/${data.collection.slug}${path.path}`}
                  key={i}
                >
                  <button type="button" className="home-page__btn">
                    {path.text}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
