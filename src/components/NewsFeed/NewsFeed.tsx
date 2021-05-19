import React from "react";

import MainContent from "./MainContent";

const NewsFeed = () => {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
        <MainContent />
      </div>
    </div>
  );
};

export default NewsFeed;
