import React from "react";
import Media from "react-media";
import { mediumScreen } from "../../globalStyles/scss/variables.scss";

export const OrderHistoryHeader = () => {
  return (
    <Media
      query={{
        minWidth: mediumScreen
      }}
    >
      {matches => {
        return (
          <div className="orderRow__container">
            <div className="orderRow__container__indexNumber">Index Number</div>
            {matches ? (
              <>
                <div className="orderRow__container__products">
                  Products ordered
                </div>
                <div className="orderRow__container__date">Date of Order</div>
                <div className="orderRow__container__price">Total value</div>
              </>
            ) : (
              ""
            )}

            <div className="orderRow__container__status">Status</div>
          </div>
        );
      }}
    </Media>
  );
};

export default OrderHistoryHeader;
