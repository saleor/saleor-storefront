import React from "react";

import * as I from "../Image/index";
import * as S from "../styles";

const Post = props => {
  const { LikeAction, like } = props;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 8fr" }}>
        <div>
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
        </div>
        <div>
          <div>
            <p>Name User</p>
            <p>Caption Title</p>
          </div>
          <S.WrapperImageUpload>
            <S.ImageUpLoad
              src="https://www.almaghreb24.com/wp-content/uploads/2019/05/21.jpg"
              alt=""
            />
          </S.WrapperImageUpload>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <S.Reaction src={I.comment} alt="" />
            </div>

            <div>
              {like ? (
                <S.Reaction src={I.heart} onClick={LikeAction} alt="" />
              ) : (
                <S.Reaction src={I.like} onClick={LikeAction} alt="" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
