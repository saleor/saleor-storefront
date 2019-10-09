import React from "react";

import NoPhoto from "images/no-photo.svg";

export const PlaceholderImage: React.FC = () => {
  return <img src={NoPhoto} alt="placeholder" />;
};
