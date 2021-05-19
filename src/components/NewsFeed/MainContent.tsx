import React, { useState } from "react";

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
          <S.WrapperStatus>
            <div style={{ width: "48px", height: "48px" }}>
              {/* <p style={{ padding: "10px 0px" }}>Avatar</p> */}
              <img
                src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
                alt="123"
                width="100%"
                height="100%"
                style={{
                  border: "1px solid",
                  borderRadius: "50px",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <S.Status type="text" placeholder="What's happening?" />
              <div>
                {/* <button>
                  <span style={{ color: "#ff6a00", fontWeight: "bold" }}>
                    Everyone can reply
                  </span>
                </button> */}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{ color: "#ff6a00" }}
                    src="./Image/landscape.png"
                    alt=""
                  />
                  {/* <GifOutlinedIcon style={{ color: "#ff6a00" }} />
                  <PollOutlinedIcon style={{ color: "#ff6a00" }} />
                  <SentimentSatisfiedOutlinedIcon
                    style={{ color: "#ff6a00" }}
                  />
                  <ScheduleOutlinedIcon style={{ color: "#ff6a00" }} /> */}
                </div>
                <div style={{ textAlign: "right" }}>
                  <S.BtnUpStatus>
                    <span>Post</span>
                  </S.BtnUpStatus>
                </div>
              </div>
            </div>
          </S.WrapperStatus>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 8fr" }}>
            {/* <div>
              <div> */}
            <img
              src="https://ggstorage.oxii.vn/images/oxii-2019-3-29/728x436/cristiano-ronaldo-pics_1564_1064_949.jpg"
              alt="123"
              width="100%"
              height="100%"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "1px solid",
              }}
            />
            {/* </div>
            </div> */}
            <div>
              <div>
                <p>Name User</p>
                <p>Caption Title</p>
              </div>
              <div style={{ width: "504px", height: "297px" }}>
                <img
                  src="https://www.almaghreb24.com/wp-content/uploads/2019/05/21.jpg"
                  alt=""
                  width="100%"
                  height="100%"
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                {/* {like ? (
                  <FavoriteBorderIcon
                    onClick={LikeAction}
                    style={{ color: "#ff6a00", cursor: "pointer" }}
                  />
                ) : (
                  <FavoriteIcon
                    onClick={LikeAction}
                    style={{ color: "#ff6a00", cursor: "pointer" }}
                  />
                )}
                <ChatBubbleOutlineIcon style={{ color: "#ff6a00" }} /> */}
                <i className="far fa-heart" />a
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
