import React from "react";

import MainContent from "./MainContent";
import SidebarLeft from "./SidebarLeft";

const NewsFeed = () => {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
        <SidebarLeft />
        <MainContent />
      </div>
    </div>
  );
};

export default NewsFeed;
