import React from "react";

import * as S from "./styles";

function CommentBox(props) {
  return (
    <S.Wrapper>
      <S.CommentWrap>
        {mocker.map((item, index) => {
          return (
            <S.CommentItem>
              <S.Avatar src={item.imgUrl} />
              <S.Comment>
                <S.Name>{item.name}</S.Name>
                <S.Text>{item.comment}</S.Text>
              </S.Comment>
            </S.CommentItem>
          );
        })}
      </S.CommentWrap>
    </S.Wrapper>
  );
}

const mocker = [
  {
    id: 1,
    name: "thang Pham",
    imgUrl:
      "https://media-exp1.licdn.com/dms/image/C5603AQEssIXSeg_vIw/profile-displayphoto-shrink_100_100/0/1595383496364?e=1626912000&v=beta&t=BSIbtMVKpgL-m_P-m_xlMGDml8KhWELsEE4iMrf8CwQ",
    comment:
      "contact me via ltruong @ssgcorp.com if you need a B2B leads service for oversea market",
  },
  {
    id: 2,
    name: "lOI Pham",
    imgUrl:
      "https://media-exp1.licdn.com/dms/image/C5603AQEnaO5F8ae5cQ/profile-displayphoto-shrink_200_200/0/1606053198435?e=1626912000&v=beta&t=zXRN966_BlL0AujvYVuYb9od8AxLUNH4IaQilpp1c5g",
    comment:
      "contact me via ltruong @ssgcorp.com if you need a B2B leads service for oversea market",
  },
  // {
  //   id: 3,
  //   name: "Carroto",
  //   imgUrl:
  //     "https://media-exp1.licdn.com/dms/image/C4E03AQFgLkmqX5-oxA/profile-displayphoto-shrink_200_200/0/1599189829877?e=1626912000&v=beta&t=YLJNKjFE8HJkT4Cvz9VwaQdZWxTCXc_B7HkRE3uigfU",
  //   comment:
  //     "contact me via ltruong @ssgcorp.com if you need a B2B leads service for oversea market",
  // },
  // {
  //   id: 4,
  //   name: "Nguyen Nguyen",
  //   imgUrl:
  //     "https://media-exp1.licdn.com/dms/image/C5603AQFGSlWVtdCHTQ/profile-displayphoto-shrink_200_200/0/1579657068463?e=1626912000&v=beta&t=SHBgF1Cuo8-8UUoFzDYf6Oqgs3WIwWdHoWHPewD0lJ8",
  //   comment:
  //     "contact me via ltruong @ssgcorp.com if you need a B2B leads service for oversea market",
  // },
  // {
  //   id: 5,
  //   name: "thang Pham",
  //   imgUrl:
  //     "https://media-exp1.licdn.com/dms/image/C5603AQEssIXSeg_vIw/profile-displayphoto-shrink_100_100/0/1595383496364?e=1626912000&v=beta&t=BSIbtMVKpgL-m_P-m_xlMGDml8KhWELsEE4iMrf8CwQ",
  //   comment:
  //     "contact me via ltruong @ssgcorp.com if you need a B2B leads service for oversea market",
  // },
];

export default CommentBox;
