import * as React from "react";

const ArtisanVideo: React.FC<{
  srcVideo: string;
}> = ({ srcVideo }) => (
  <div className="collection-page__video">
    <iframe
      title="Vimeo"
      src={srcVideo}
      width="640"
      height="360"
      allow="autoplay; fullscreen"
    />
  </div>
);

export default ArtisanVideo;
