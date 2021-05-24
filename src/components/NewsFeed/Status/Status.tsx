import React, { useState } from "react";

import {
  TypeUpdateAvatarMutation,
  TypeUpdateAvatarQuery,
} from "../../../@next/components/molecules/AccountTabTiles/queries";
import * as I from "../Image/index";
import * as S from "../styles";

const action = [
  { actionStatus: I.landscape },
  { actionStatus: I.gif },
  { actionStatus: I.poll },
  { actionStatus: I.happy },
  { actionStatus: I.event },
];

const Status = props => {
  const anchor = React.useRef<HTMLInputElement>(null);

  const handleImageUploadButtonClick = () => anchor.current?.click();
  const { privacy, changePrivacy } = props;
  // const [isFile, setIsFile] = useState(null);
  // const ActiveIsFile = () => {
  //   const file = <input type="file" />;
  //   setIsFile(file);
  // };
  return (
    <div>
      <S.WrapperStatus>
        <S.WrapperAvatar>
          <S.Avatar
            src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
            alt=""
          />
        </S.WrapperAvatar>
        <div>
          <S.Status
            type="text"
            placeholder="What's happening?"
            onClick={changePrivacy}
          />
          {privacy && (
            <S.WrapperPrivacy>
              <S.BtnPrivacy>
                <S.PrivacyStatus src={I.earth} alt="" />
                <S.TextPrivacy>Everyone can reply</S.TextPrivacy>
              </S.BtnPrivacy>
            </S.WrapperPrivacy>
          )}

          <S.WrapActionStatus>
            <S.WrapperActionStatus>
              {/* {action.map((items, index) => ( */}
              <div>
                <button onClick={handleImageUploadButtonClick}>
                  <S.ActionStatus src={I.landscape} alt="" />
                </button>
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={anchor}
                  accept="image/*"
                />
              </div>
              {/* {isFile && <input type="file" />} */}
              <S.ActionStatus src={I.gif} alt="" />
              <S.ActionStatus src={I.poll} alt="" />
              <S.ActionStatus src={I.happy} alt="" />
              <S.ActionStatus src={I.event} alt="" />
              {/* ))} */}
            </S.WrapperActionStatus>
            <S.WrapPost>
              <S.BtnUpStatus>
                <span>Post</span>
              </S.BtnUpStatus>
            </S.WrapPost>
          </S.WrapActionStatus>
        </div>
      </S.WrapperStatus>
    </div>
  );
};

export default Status;
