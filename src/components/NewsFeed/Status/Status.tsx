import React from "react";

import * as I from "../Image/index";
import * as S from "../styles";

const Status = () => {
  return (
    <div>
      <S.WrapperStatus>
        <div style={{ width: "48px", height: "48px" }}>
          {/* <p style={{ padding: "10px 0px" }}>Avatar</p> */}
          <img
            src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
            alt="123"
            width="100%"
            height="100%"
            style={{
              border: "1px solid",
              borderRadius: "50px",
              outline: "none",
            }}
          />
        </div>
        <div>
          <S.Status type="text" placeholder="What's happening?" />
          <div>
            {/* <button>
                  <span style={{ color: "#ff6a00", fontWeight: "bold" }}>
                    Everyone can reply
                  </span>
                </button> */}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                alignItems: "center",
              }}
            >
              <img
                style={{ color: "#ff6a00", width: "20px" }}
                src={I.landscape}
                alt=""
              />
              <img
                style={{ color: "#ff6a00", width: "20px" }}
                src={I.gif}
                alt=""
              />
              <img
                style={{ color: "#ff6a00", width: "20px" }}
                src={I.poll}
                alt=""
              />
              <img
                style={{ color: "#ff6a00", width: "20px" }}
                src={I.happy}
                alt=""
              />
              <img
                style={{ color: "#ff6a00", width: "20px" }}
                src={I.event}
                alt=""
              />
            </div>
            <div style={{ textAlign: "right" }}>
              <S.BtnUpStatus>
                <span>Post</span>
              </S.BtnUpStatus>
            </div>
          </div>
        </div>
      </S.WrapperStatus>
    </div>
  );
};

export default Status;
