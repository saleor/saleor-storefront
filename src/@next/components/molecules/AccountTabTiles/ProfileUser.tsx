import { useAuth } from "@saleor/sdk";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

import { Loader, Tile } from "@components/atoms";
import { commonMessages } from "@temp/intl";

import { TypeUpdateAvatarMutation, TypeUpdateAvatarQuery } from "./queries";
import * as S from "./styles";

export const ProfileUser: React.FC = () => {
  const { user } = useAuth();

  const anchor = React.useRef<HTMLInputElement>(null);

  const handleImageUploadButtonClick = () => anchor.current?.click();

  if (!user) {
    return <Loader />;
  }

  return (
    <S.TileWrapper>
      <Tile>
        <S.WrapperUP>
          <TypeUpdateAvatarQuery variables={{ id: user.id }}>
            {({ data: avatar, refetch }) => {
              const avatarUrl = avatar?.user?.avatar?.url;
              return (
                <TypeUpdateAvatarMutation
                  onCompleted={() => {
                    refetch();
                  }}
                >
                  {(updatePhoto, {}) => {
                    return (
                      <S.UpLoadPhoto>
                        <S.UserAvatar
                          src={
                            avatarUrl ||
                            "//gtms01.alicdn.com/tps/i1/TB1vdHdIpXXXXXYXXXXF5vTHFXX-60-59.png"
                          }
                          alt=""
                        />

                        <S.BtnUpload onClick={handleImageUploadButtonClick}>
                          <FormattedMessage {...commonMessages.upLoadPhoto} />
                        </S.BtnUpload>
                        <input
                          id="fileUpload"
                          style={{ display: "none" }}
                          onChange={event => {
                            return (
                              event.target?.files?.[0] &&
                              updatePhoto({
                                variables: { image: event.target.files[0] },
                              })
                            );
                          }}
                          type="file"
                          ref={anchor}
                          accept="image/*"
                        />
                      </S.UpLoadPhoto>
                    );
                  }}
                </TypeUpdateAvatarMutation>
              );
            }}
          </TypeUpdateAvatarQuery>
          <S.WrapperChildUP>
            <S.YourMemberID>
              <S.TextColor>Your Member ID:</S.TextColor>
              <span>{user?.id}</span>
            </S.YourMemberID>
            <S.Email>
              <S.TextColor>Email:</S.TextColor>
              <span>{user?.email}</span>
            </S.Email>
          </S.WrapperChildUP>
        </S.WrapperUP>
      </Tile>
    </S.TileWrapper>
  );
};
