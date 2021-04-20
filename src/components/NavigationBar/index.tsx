import React, { useState } from "react";

import * as S from "./styles";

interface IProps {
  listNav: any;
}
function NavigationBar({ listNav }: IProps) {
  const [stt, setStt] = useState(false);
  return (
    <S.WrapperAll>
      <S.Wrapper>
        <S.H
          onClick={() => {
            const temp = stt;
            setStt(!temp);
          }}
        >
          <span
            style={{
              width: "18px",
              height: "2px",
              background: "#fff",
            }}
          />
          <span
            style={{
              width: "18px",
              height: "2px",
              background: "#fff",
            }}
          />
          <span
            style={{
              width: "18px",
              height: "2px",
              background: "#fff",
            }}
          />
        </S.H>
        <S.NavBox
          stt={stt}
          onClick={() => {
            setStt(false);
          }}
        >
          <S.NavList>
            {listNav.map((item, index) => {
              return (
                <S.NavListItem key={index}>
                  <a style={{ display: "block" }}>
                    <span>{item.title}</span>
                    {item.category ? (
                      <S.Icon>
                        <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
                      </S.Icon>
                    ) : null}
                  </a>
                  {item.category ? (
                    <S.DropDownContent>
                      {item.category.map((item, index) => {
                        return (
                          <S.DropDownItem key={index}>
                            <span style={{ flex: 1 }}>{item.title}</span>
                          </S.DropDownItem>
                        );
                      })}
                    </S.DropDownContent>
                  ) : null}
                </S.NavListItem>
              );
            })}
          </S.NavList>
        </S.NavBox>
      </S.Wrapper>
    </S.WrapperAll>
  );
}

export default NavigationBar;
