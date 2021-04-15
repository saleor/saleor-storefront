import React from "react";

import { Tile } from "@components/atoms";

import * as S from "./styles";

export const InforProfile = () => {
  return (
    <div>
      <Tile>
        <S.Layout>
          <div style={{ flex: 1 }}>
            <S.Header>Personal Information</S.Header>
            <S.MarginLink>
              <S.LinkTag href="#">
                My Profile
              </S.LinkTag>
            </S.MarginLink>

            <S.MarginLink>
              <S.LinkTag href="#">
                Member Profile
              </S.LinkTag>
            </S.MarginLink>

            <S.MarginLink>
              <S.LinkTag href="#">
                Upload My Photo
              </S.LinkTag>
            </S.MarginLink>

            <S.MarginLink>
              <S.LinkTag href="#">
                Privacy Setting
              </S.LinkTag>
            </S.MarginLink>

            <S.MarginLink>
              <S.LinkTag href="#">
                Email Services
              </S.LinkTag>
            </S.MarginLink>
          </div>
          <div style={{ flex: 1 }}>
            <S.Header>Account Security</S.Header>
            <S.MarginLink>
              <S.LinkTag href="#">
                Change Email Address
              </S.LinkTag>
            </S.MarginLink>

            <S.MarginLink>
              <S.LinkTag href="#">
                Change Password
              </S.LinkTag>
            </S.MarginLink>

            <S.MarginLink>
              <S.LinkTag href="#">
                Set Security Question
              </S.LinkTag>
            </S.MarginLink>

            <S.MarginLink>
              <S.LinkTag href="#">
                Manage Verification Phones
              </S.LinkTag>
            </S.MarginLink>

            <S.MarginLink>
              <S.LinkTag href="#">
                Manage My Connected Accounts
              </S.LinkTag>
            </S.MarginLink>
          </div>
          <div style={{ flex: 1 }}>
            <S.Header>Finance Account</S.Header>
            <S.MarginLink>
              <S.LinkTag href="#">
                My Transactions Center
              </S.LinkTag>
            </S.MarginLink>
          </div>
        </S.Layout>
      </Tile>
    </div>
  );
};
