import { useAuth } from "@saleor/sdk";
import React from "react";

import { Tile } from "@components/atoms";

import * as S from "./styles";

import "./css/styles.scss";

export const ProfileUser: React.FC = () => {
  const { user } = useAuth();

  return (
    <S.TileWrapper>
      <Tile>
        <S.Layout>
          <div style={{ flex: 1 }}>
            <a href="1" className="linkProfileUser">
              Upload Photo
            </a>
          </div>

          <div style={{ flex: 3 }}>
            <p>Your Member ID: {user?.id}</p>
            <p>Email: {user?.email}</p>
            <p>
              Linked Mobile:
              <a
                href="2"
                className="linkProfileUser"
                style={{ marginLeft: "5px" }}
              >
                Enter Mobile Number
              </a>
            </p>
          </div>

          <div style={{ flex: 3 }}>
            <a href="3" className="linkProfileUser">
              Change Email Address
            </a>
          </div>
        </S.Layout>
      </Tile>
    </S.TileWrapper>
  );
};
