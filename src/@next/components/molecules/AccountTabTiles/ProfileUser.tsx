import { useAuth } from "@saleor/sdk";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

import { Loader, Tile } from "@components/atoms";
import { commonMessages } from "@temp/intl";

import { TextField } from "../TextField";
import { TypeUpdateAvatarMutation, TypeUpdateUserAddress } from "./queries";
import * as S from "./styles";

export const ProfileUser: React.FC = () => {
  const { user } = useAuth();
  const [updateProfile, setUpdateProfile] = useState(false);
  const [, setRerender] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("Enter Mobile Number");

  const anchor = React.useRef<HTMLInputElement>(null);

  const handleImageUploadButtonClick = () => anchor.current?.click();

  if (!user) {
    return <Loader />;
  }

  return (
    <S.TileWrapper>
      <Tile>
        <S.FlexDiv>
          <TypeUpdateAvatarMutation
            onCompleted={() => {
              setUpdateProfile(false);
              setRerender(true);
            }}
          >
            {(updatePhoto, { loading, data }) => {
              return (
                <S.UpLoadPhoto>
                  <S.UserAvatar
                    src={
                      data
                        ? data?.userAvatarUpdate?.user?.avatar?.url
                        : "//gtms01.alicdn.com/tps/i1/TB1vdHdIpXXXXXYXXXXF5vTHFXX-60-59.png"
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
          <S.FlexChild>
            <S.FlexFourCol>
              <S.YourMemberID>
                <S.FlexSpanOneCol>Your Member ID:</S.FlexSpanOneCol>
                <S.FlexSpanThreeCol>{user?.id}</S.FlexSpanThreeCol>
              </S.YourMemberID>

              <S.Email>
                <S.FlexSpanOneCol>Email:</S.FlexSpanOneCol>
                <S.FlexSpanThreeCol>
                  <S.FlexSpanThreeCol>{user?.email}</S.FlexSpanThreeCol>
                </S.FlexSpanThreeCol>
              </S.Email>

              <S.Mobile>
                <S.FlexSpanOneCol>Mobile:</S.FlexSpanOneCol>
                <S.FlexSpanThreeCol>
                  {updateProfile ? (
                    <S.InforProfileInput>
                      <TextField
                        type="number"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                      />
                    </S.InforProfileInput>
                  ) : (
                    <S.LinkTagPU href="#">{phoneNumber}</S.LinkTagPU>
                  )}
                </S.FlexSpanThreeCol>
              </S.Mobile>

              {updateProfile && (
                <TypeUpdateUserAddress
                  onCompleted={() => {
                    setUpdateProfile(false);
                    setRerender(true);
                  }}
                >
                  {(updateStaff, { loading, data }) => {
                    return (
                      <S.FormButtons>
                        <S.BtnCancelProfile
                          type="button"
                          color="secondary"
                          onClick={() => {
                            setUpdateProfile(false);
                          }}
                        >
                          <FormattedMessage {...commonMessages.cancel} />
                        </S.BtnCancelProfile>
                        <S.BtnSaveProfile
                          type="submit"
                          onClick={() => {
                            updateStaff({
                              variables: {
                                // id: user.id,
                                addressInput: phoneNumber,
                              },
                            });
                          }}
                        >
                          <FormattedMessage {...commonMessages.save} />
                        </S.BtnSaveProfile>
                      </S.FormButtons>
                    );
                  }}
                </TypeUpdateUserAddress>
              )}
            </S.FlexFourCol>

            {!updateProfile && (
              <S.UpdateProfile>
                <S.BtnUserProfile onClick={() => setUpdateProfile(true)}>
                  <S.LinkUserProfile href="#">Update Profile</S.LinkUserProfile>
                </S.BtnUserProfile>
              </S.UpdateProfile>
            )}
          </S.FlexChild>
        </S.FlexDiv>
      </Tile>
    </S.TileWrapper>
  );
};
