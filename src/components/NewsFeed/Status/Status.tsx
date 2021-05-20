import React from "react";

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
  const { privacy, changePrivacy } = props;
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
              {action.map((items, index) => (
                <S.ActionStatus key={index} src={items.actionStatus} alt="" />
              ))}
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
