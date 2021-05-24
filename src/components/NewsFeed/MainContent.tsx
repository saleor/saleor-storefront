import React, { useState } from "react";

import Post from "./Post/Post";
// import Status from "./Status/Status";
import * as S from "./styles";

const MainContent = () => {
  const [like, setLike] = useState(true);
  const LikeAction = () => {
    setLike(!like);
  };
  // const [privacy, setPrivacy] = useState(false);
  // const changePrivacy = () => {
  //   setPrivacy(true);
  // };
  return (
    <div>
      <div>
        <S.WrapMaincontent>
          {/* <div>
            <h3>Home</h3>
          </div> */}
          {/* <Status privacy={privacy} changePrivacy={changePrivacy} /> */}
          <Post like={like} LikeAction={LikeAction} />
        </S.WrapMaincontent>
      </div>
    </div>
  );
};

export default MainContent;
