import React from "react";

import SidebarRight from "./SidebarRight";
import * as S from "./styles";

const MainContent = () => {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div>
          <div>
            <h3>Home</h3>
          </div>
          <S.Wrapper>
            <div>
              <p>Avatar</p>
            </div>
            <div>
              <S.Status type="text" placeholder="What's happening?" />
              <div>
                <button>
                  <span style={{ color: "#ff6a00", fontWeight: "bold" }}>
                    Everyone can reply
                  </span>
                </button>
              </div>
              <div
                style={{ display: "grid", gridTemplateColumns: "auto auto" }}
              >
                <div>
                  <p>img react status</p>
                </div>
                <div style={{ float: "right" }}>
                  <button>
                    <span>Tweet</span>
                  </button>
                </div>
              </div>
            </div>
          </S.Wrapper>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 8fr" }}>
            <div>Avatar</div>
            <div>
              <div>
                <p>Name User</p>
                <p>Caption Title</p>
              </div>
              <div style={{ width: "504px", height: "297px" }}>
                <img
                  src="https://www.almaghreb24.com/wp-content/uploads/2019/05/21.jpg"
                  alt=""
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
        <SidebarRight />
      </div>
    </div>
  );
};

export default MainContent;
