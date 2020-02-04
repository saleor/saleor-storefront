import React from "react";

import { Button, Loader } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const LoadingListAdapter: React.FC<IProps> = ({
  loading,
  canLoadMore = true,
  loadMoreText = "More +",
  onLoadMore,
  children,
}: IProps) => {
  return (
    <>
      {children}
      <S.Wrapper>
        {loading ? (
          <Loader />
        ) : (
          canLoadMore && (
            <Button color="secondary" onClick={onLoadMore}>
              {loadMoreText}
            </Button>
          )
        )}
      </S.Wrapper>
    </>
  );
};
