import * as React from "react";
import "./scss/index.scss";


const SiteMap: React.FC<any> = () => {
  return (
    <div className="footer-siteMap">
      <div className="siteMap-col">
        <dl>
          <dt>Customer Service</dt>
          <dd>
            <a href="#">Help Center</a>
          </dd>
          <dd>
            <a href="#">Contact Us</a>
          </dd>
          <dd>
            <a href="#">Report</a>
          </dd>
          <dd>
            <a href="#">policies</a>
          </dd>
          <dd>
            <a href="#">Feedback</a>
          </dd>
        </dl>
      </div>
      <div className="siteMap-col">
        <dl>
          <dt>About Us</dt>
          <dd>
            <a href="#">About Thachsanh</a>
          </dd>
          <dd>
            <a href="#">SiteMap</a>
          </dd>
        </dl>
      </div>
      <div className="siteMap-col">
        <dl>
          <dt>Source On ThachSanh</dt>
          <dd>
            <a href="#">Resource</a>
          </dd>
          <dd>
            <a href="#">All Categories</a>
          </dd>
          <dd>
            <a href="#">Ready To Ship</a>
          </dd>
          <dd>
            <a href="#">Buyer Partners</a>
          </dd>
        </dl>
      </div>
      <div className="siteMap-col">
        <dl>
          <dt>Sell On ThachSanh</dt>
          <dd>
            <a href="#">Supplier Memberships</a>
          </dd>
          <dd>
            <a href="#">Learning Center</a>
          </dd>
          <dd>
            <a href="#">Partner Program</a>
          </dd>
        </dl>
      </div>
      <div className="siteMap-col">
        <dl>
          <dt>Trade Services</dt>
          <dd>
            <a href="#">Business Identity</a>
          </dd>
          <dd>
            <a href="#">Logistic Service</a>
          </dd>
          <dd>
            <a href="#">Lettter of Credit</a>
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default SiteMap;
