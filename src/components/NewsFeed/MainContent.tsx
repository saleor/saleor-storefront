import React, { useState } from "react";

import Post from "./Post/Post";
import * as S from "./styles";

const MainContent = () => {
  const [like, setLike] = useState(true);
  const LikeAction = () => {
    setLike(!like);
  };
  return (
    <div>
      <div>
        <S.WrapMaincontent>
          <Post like={like} LikeAction={LikeAction} posts={mockData[0]} />
        </S.WrapMaincontent>
      </div>
    </div>
  );
};

const mockData = [
  {
    id: 1,
    imgAvatar:
      "https://ggstorage.oxii.vn/images/oxii-2019-3-29/728x436/cristiano-ronaldo-pics_1564_1064_949.jpg",
    name: "Thang Pham",
    caption:
      "On Monday Taiwan banned large indoor events of over 100 people and outdoor gatherings of more than 500 people as a small number of community #COVID19 cases has grown over the last week from an outbreak of cases which includes the 'emergence of six domestically transmitted cases that did not have known sources of infection.'",
    imgUpload: "https://www.almaghreb24.com/wp-content/uploads/2019/05/21.jpg",
  },
  {
    id: 2,
    imgAvatar:
      "https://ggstorage.oxii.vn/images/oxii-2019-3-29/728x436/cristiano-ronaldo-pics_1564_1064_949.jpg",
    name: "Thang Pham",
    caption:
      "On Monday Taiwan banned large indoor events of over 100 people and outdoor gatherings of more than 500 people as a small number of community #COVID19 cases has grown over the last week from an outbreak of cases which includes the 'emergence of six domestically transmitted cases that did not have known sources of infection.'",
    imgUpload: "https://www.almaghreb24.com/wp-content/uploads/2019/05/21.jpg",
  },
  {
    id: 3,
    imgAvatar:
      "https://ggstorage.oxii.vn/images/oxii-2019-3-29/728x436/cristiano-ronaldo-pics_1564_1064_949.jpg",
    name: "Thang Pham",
    caption:
      "On Monday Taiwan banned large indoor events of over 100 people and outdoor gatherings of more than 500 people as a small number of community #COVID19 cases has grown over the last week from an outbreak of cases which includes the 'emergence of six domestically transmitted cases that did not have known sources of infection.'",
    imgUpload: "https://www.almaghreb24.com/wp-content/uploads/2019/05/21.jpg",
  },
  {
    id: 4,
    imgAvatar:
      "https://ggstorage.oxii.vn/images/oxii-2019-3-29/728x436/cristiano-ronaldo-pics_1564_1064_949.jpg",
    name: "Thang Pham",
    caption:
      "On Monday Taiwan banned large indoor events of over 100 people and outdoor gatherings of more than 500 people as a small number of community #COVID19 cases has grown over the last week from an outbreak of cases which includes the 'emergence of six domestically transmitted cases that did not have known sources of infection.'",
    imgUpload: "https://www.almaghreb24.com/wp-content/uploads/2019/05/21.jpg",
  },
];

export default MainContent;
