import { useAuth } from "@saleor/sdk";
import React from "react";

import { Tile } from "@components/atoms";

import * as S from "./styles";

export const ProfileUser: React.FC = () => {
  const { user } = useAuth();

  return (
    <S.TileWrapper>
      <Tile>
        <S.Layout>
          <S.UpLoadPhoto style={{ flex: 1 }}>
            <div>
              <img src="//gtms01.alicdn.com/tps/i1/TB1vdHdIpXXXXXYXXXXF5vTHFXX-60-59.png" alt="" style={{ marginLeft: "20px" }} />
            </div>
            <S.LinkTagPU href="#">
              Upload Photo
            </S.LinkTagPU>
          </S.UpLoadPhoto>

          <div style={{ flex: 1 }}>
            <p>Your Member ID:</p>
            <p>Email: </p>
            <p>
              Linked Mobile:
            </p>
          </div>

          <div style={{ flex: 2 }}>
            <p>
              {user?.id}
            </p>
            <p>
              {user?.email}
            </p>
            <p>
              <S.LinkTagPU
                href="#"
                style={{ marginLeft: "5px" }}
              >
                Enter Mobile Number
              </S.LinkTagPU>
            </p>
          </div>

          <div style={{ flex: 3, paddingTop: "32px" }}>
            <S.LinkTagPU href="#">
              Change Email Address
            </S.LinkTagPU>
          </div>
        </S.Layout>
      </Tile>
    </S.TileWrapper>
  );
};
