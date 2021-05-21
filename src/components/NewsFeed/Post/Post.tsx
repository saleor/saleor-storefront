import React from "react";

import CommentBox from "../CommentBox";
import CommentInput from "../CommentInput";
import * as I from "../Image/index";
import * as S from "../styles";

const Post = props => {
  const { LikeAction, like, posts } = props;
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 8fr",
        }}
      >
        <div>
          <img
            src={posts?.imgAvatar}
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
            <p>{posts.name}</p>
            <p>{posts.caption}</p>
          </div>
          <S.WrapperImageUpload>
            <S.ImageUpLoad src={posts?.imgUpload} alt="" />
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
          <CommentInput />
          <CommentBox />
        </div>
      </div>
    </div>
  );
};

export default Post;
