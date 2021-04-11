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
  console.log(page);
  
  return (
    <S.SelectWrapper>
      <S.Title>Item per page</S.Title>
      <S.Select
        value={page}
        onChange={e => {
          const value = parseInt(e.target.value);
          setPage(value);
        }}
      >
        {[5,10,15,20].map((item,index)=>{
          return(
            <S.Option key={index} value={item} disabled={page===item}>{item}</S.Option>
          )
        })}
        
      </S.Select>
    </S.SelectWrapper>
  );
};

export default SelectPageSize;
