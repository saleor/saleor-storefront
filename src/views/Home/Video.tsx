import * as React from "react";

const ArtisanVideo: React.FC<{
  srcVideo: string;
}> = ({ srcVideo }) => (
  <div className="product-page__product__video">
    <iframe src={srcVideo} allow="autoplay; fullscreen"></iframe>
  </div>
);

export default ArtisanVideo;