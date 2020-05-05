import topArrow from "images/arrow-down.svg";
import bottomArrow from "images/arrow-up.svg";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { PageHeader } from "../../components/Header/PageHeader";


const Page = props => {
  const [show, showOverlay] = useState(false);
  const { data, history } = props;

  const handleOverlay = () => {
    showOverlay(!show);
  };

  const handleClick = () => {
    history.push("/collections/cabinets");
  };

  return (
    <div style={{ "backgroundImage": `url(${data.collection.backgroundImage.url})` }} className="divImg">
      <PageHeader handleClick={handleClick}/>
      <div className="overlay-wrap">
        <div
          className={show ? "overlay-wrap--inner overlay-down-arrow-div" : " overlay-wrap--inner overlay-arrow-div"}>
          <div>
            <img src={show ? topArrow : bottomArrow}
                 className="overlay-arrow" onClick={handleOverlay}/>
          </div>
          <div className={show ? "overlay-height overlay-height-down" : "overlay-height"}>
            <div className="overlay-heading">
              <span>{data.collection.name}</span>
              <span>$81,318</span>
            </div>
            <div className="overlay-button-list">
              <Link to={`/collections/cabinets/${data.collection.id}/${data.collection.slug}/samples`}>
                <button type="button" className="home-page__btn">View Samples</button>
              </Link>
              <Link to={`/collections/cabinets/${data.collection.id}/${data.collection.slug}/available-colors`}>
                <button type="button" className="home-page__btn">Available Colors</button>
              </Link>
              <Link to={`/collections/cabinets/${data.collection.id}/${data.collection.slug}/view-details`}>
                <button type="button" className="home-page__btn">View Details</button>
              </Link>
              <Link to={`/collections/cabinets/${data.collection.id}/${data.collection.slug}/specification`}>
                <button type="button" className="home-page__btn">Specification</button>
              </Link>
              <Link to={`/collections/cabinets/${data.collection.id}/${data.collection.slug}/items-included`}>
                <button type="button" className="home-page__btn">Items Included</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
