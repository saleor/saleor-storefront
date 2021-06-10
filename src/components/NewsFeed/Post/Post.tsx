import React from "react";
import styled from "styled-components";

import { GridImage } from "@components/atoms/GridImage";

import CommentBox from "../CommentBox";
import CommentInput from "../CommentInput";

const Post = (props: any) => {
  const { post } = props;
  const content = post?.content && post?.content.replace(/'/g, '"');
  const imgUpload = post.media.map(item => ({
    url: `http://thachsanh.store:8080/media/${item.image}`,
  }));

  // const imgUpload= post?
  return (
    <Wrapper>
      <Header>
        <AvatarWrap>
          <Avatar src="https://ggstorage.oxii.vn/images/oxii-2019-3-29/728x436/cristiano-ronaldo-pics_1564_1064_949.jpg" />
        </AvatarWrap>

        <Name>Store Name</Name>
      </Header>
      <Content>
        <PostContent>{content && JSON.parse(content).content}</PostContent>

        <GridImage
          width={100}
          images={imgUpload}
          countFroms={5}
          hideOverlay={false}
          onClickEach={null}
          overlayBackgroundColor="#222222"
        />
      </Content>
      <CommentInput />
      <CommentBox />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid #00000020;
  width: 50%;
  padding: 1rem 1rem 0 1rem;
  border-radius: 15px;
  margin: 1rem 0 0 0;
`;
// head
const Header = styled.div`
  display: flex;
`;

const AvatarWrap = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  margin-left: 0.3rem;
`;

// content

const Content = styled.div`
  margin-bottom: 1rem;
`;

const PostContent = styled.p`
  font-size: 0.9rem;
`;

export default Post;
