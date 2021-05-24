import React from "react";

import MainContent from "./MainContent";

const NewsFeed = () => {
  return (
    <div style={{ background: "#f2f2f2" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1fr",
          }}
        >
          <div />
          <MainContent />
          <div />
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
