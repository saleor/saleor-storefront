import React from "react";

import MainContent from "./MainContent";
import * as S from "./styles";

const NewsFeed = () => {
  return (
    <div style={{ background: "#f2f2f2" }}>
      <div className="container">
        <S.WrapperNewsFeed>
          <MainContent />
        </S.WrapperNewsFeed>
      </div>
    </div>
  );
};

export default NewsFeed;
