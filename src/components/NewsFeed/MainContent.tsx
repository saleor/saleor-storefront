import React, { useState } from "react";

import * as I from "./Image/index";
import Post from "./Post/Post";
import Status from "./Status/Status";
import * as S from "./styles";

const MainContent = () => {
  const [like, setLike] = useState(true);
  const LikeAction = () => {
    setLike(!like);
  };
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
        }}
      >
        <div style={{ display: "grid", justifyContent: "center" }}>
          <div>
            <h3>Home</h3>
          </div>
          <Status />
          <Post like={like} LikeAction={LikeAction} />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
