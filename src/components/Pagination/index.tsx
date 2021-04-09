import React, { useEffect, useState } from "react";

import * as S from "./styles";

function Pagination({ onChange, totalPage, pageSize, pageDisplay }) {
  const [curPage, setCurPage] = useState(1);
  const [page, setPage] = useState([]);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  useEffect(() => {
    const temp = createArr(totalPage);
    setPage(temp);
    setPageNumberLimit(pageDisplay);
  }, []);

  const onClick = curPage => {
    if (!curPage) return;
    setCurPage(curPage);
    onChange(curPage, pageSize);
  };

  const onPreviousPage = () => {
    setCurPage(curPage - 1);
    onChange(curPage - 1, pageSize);
    if ((curPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const onNextPage = () => {
    setCurPage(curPage + 1);
    onChange(curPage + 1, pageSize);
    if (curPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const createArr = n => {
    const arrTemp = [];
    for (let i = 1; i <= n; i++) {
      arrTemp.push(i);
    }
    return arrTemp;
  };

  const renderItem = page.map((page, index) => {
    if (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) {
      return (
        <S.PaginationItem
          isActive={curPage === page}
          key={index}
          onClick={() => onClick(page)}
        >
          {page}
        </S.PaginationItem>
      );
    }
    return null;
  });

  let pageDecrementBtn = null;
  if (page[0] < minPageNumberLimit) {
    pageDecrementBtn = (
      <S.PaginationBtn
        onClick={() => {
          onChange(minPageNumberLimit, pageSize);
          setCurPage(minPageNumberLimit);
          setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
          setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }}
      >
        &hellip;
      </S.PaginationBtn>
    );
  }

  let pageIncrementBtn = null;
  if (page.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <S.PaginationBtn
        onClick={() => {
          onChange(maxPageNumberLimit + 1, pageSize);
          setCurPage(maxPageNumberLimit + 1);
          setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }}
      >
        &hellip;
      </S.PaginationBtn>
    );
  }

  return (
    <S.PaginationWrapper>
      <S.PaginationBtn disabled={curPage === page[0]} onClick={onPreviousPage}>
        Previous
      </S.PaginationBtn>
      {pageDecrementBtn}
      {renderItem}
      {pageIncrementBtn}
      <S.PaginationBtn
        disabled={curPage === page[page.length - 1]}
        onClick={onNextPage}
      >
        Next
      </S.PaginationBtn>
    </S.PaginationWrapper>
  );
}

export default Pagination;
