/* eslint-disable jsx-a11y/control-has-associated-label */
import { useAuth } from "@saleor/sdk";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

import { Loader, Tile } from "@components/atoms";
import { commonMessages } from "@temp/intl";

import { TypeListStoreUserQuery } from "../StoreTagTiles/queries";
import { TextField } from "../TextField";
import { TypeUpdateUserAddress } from "./queries";
import * as S from "./styles";

export const ProfileUser: React.FC = () => {
  const { user } = useAuth();
  console.log("user", user);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [, setSelectedFile] = useState(null);
  const [, setLoaded] = useState(0);
  const [rerender, setRerender] = useState(false);

  // const handleChangeValueEmail = (e: {
  //   target: { value: React.SetStateAction<string | undefined> };
  // }) => {
  //   setEmail(e.target.value);
  // };

  const handleSaveUpdate = () => {
    setUpdateProfile(false);
  };

  const [phoneNumber, setPhoneNumber] = useState("Enter Mobile Number");

  const handleUploadPhoto = (e: {
    target: { files: React.SetStateAction<null>[] };
  }) => {
    // {
    //   target: { files: React.SetStateAction<null>[] };
    // }
    setSelectedFile(e.target.files[0]);
    setLoaded(0);
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <S.TileWrapper>
      <Tile>
        {/* <TypeListStoreUserQuery
          alwaysRender
          displayLoader={false}
          errorPolicy="all"
          variables={{ id: user?.id }}
        >
          {({ data, loading }) => {
            console.log({ data });
            return ( */}
        <S.FlexDiv>
          <div />
          {/* <TypedUploadProfileMutation>
                    {(updatePhoto, { loading, data }) => {
                      console.log("data", data);
                      return (
                        <S.UpLoadPhoto>
                          <img
                            src="//gtms01.alicdn.com/tps/i1/TB1vdHdIpXXXXXYXXXXF5vTHFXX-60-59.png"
                            alt=""
                          />
                          <S.InputUploadPhoto
                            type="file"
                            id="avatar"
                            name="avatar"
                            accept="image/png, image/jpeg"
                            onChange={() => handleUploadPhoto}
                          />
                        </S.UpLoadPhoto>
                      );
                    }}
                  </TypedUploadProfileMutation> */}
          <S.FlexChild>
            <S.FlexFourCol>
              <S.DisplayMarginP>
                <S.FlexSpanOneCol>Your Member ID:</S.FlexSpanOneCol>
                <S.FlexSpanThreeCol>{user?.id}</S.FlexSpanThreeCol>
              </S.DisplayMarginP>

              <S.DisplayMarginP>
                <S.FlexSpanOneCol>Email:</S.FlexSpanOneCol>
                <S.FlexSpanThreeCol>
                  <S.FlexSpanThreeCol>{user?.email}</S.FlexSpanThreeCol>
                </S.FlexSpanThreeCol>
              </S.DisplayMarginP>

              <S.DisplayProfile>
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
              </S.DisplayProfile>

              {updateProfile && (
                <TypeUpdateUserAddress
                  onCompleted={() => {
                    setUpdateProfile(false);
                    setRerender(true);
                  }}
                >
                  {(updateStaff, { loading, data }) => {
                    console.log("data", data);
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

        {/* }} */}
        {/* </TypeListStoreUserQuery> */}
      </Tile>
    </S.TileWrapper>
  );
};
