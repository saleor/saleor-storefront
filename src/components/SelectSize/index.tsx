import React from "react";
import * as S from "./styles";

interface IProps {
  onChangePageSize?: (data: number) => void;
  page: number;
  setPage: (data: number) => void;
}

const SelectPageSize: React.FC<IProps> = ({
  onChangePageSize = data => null,
  page,
  setPage,
}: IProps) => {
  return (
    <S.SelectWrapper>
      <S.Title>Item per page</S.Title>
      <S.Select
        value={page}
        onChange={e => {
          const value = parseInt(e.target.value);
          setPage(value);
          //   onChangePageSize(value);
        }}
      >
        <S.Option value={0} disabled>
          Please select a value
        </S.Option>
        <S.Option value={5}>5</S.Option>
        <S.Option value={10}>10</S.Option>
        <S.Option value={15}>15</S.Option>
        <S.Option value={20}>20</S.Option>
      </S.Select>
    </S.SelectWrapper>
  );
};

export default SelectPageSize;
