import React from "react";

import Post from "./Post/Post";
import { TypedGetPostByFollows } from "./queries";
import * as S from "./styles";

const MainContent = () => {
  return (
    <S.WrapMaincontent>
      <TypedGetPostByFollows
        variables={{
          first: 20,
        }}
      >
        {({ data }) => (
          <>
            {data?.postsByFollows?.edges.map(item => {
              return <Post post={item.node} />;
            })}
          </>
        )}
      </TypedGetPostByFollows>
      {/* {mockData.map((item, index) => {
        return;
      })} */}
    </S.WrapMaincontent>
  );
};

export default MainContent;
