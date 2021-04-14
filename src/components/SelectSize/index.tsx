import React from "react";

import * as S from "./styles";

type Props = {
  page: number;
  setPage: (data: number) => void;
};

const ARR_PAGE = [5, 10, 15, 20];

const SelectPageSize: React.FC<Props> = ({ page, setPage }) => {
  return (
    <S.SelectWrapper>
      <S.Title>Item per page</S.Title>
      <S.Select
        value={page}
        onChange={e => {
          const value = e.target.value && parseInt(e.target.value, 10);
          setPage(value);
        }}
      >
        {ARR_PAGE.map((item, index) => {
          return (
            <S.Option key={index} value={item} disabled={page === item}>
              {item}
            </S.Option>
          );
        })}
      </S.Select>
    </S.SelectWrapper>
  );
};

export default SelectPageSize;
