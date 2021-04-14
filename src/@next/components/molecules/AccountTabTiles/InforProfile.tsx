import React from "react";

import { Tile } from "@components/atoms";

import * as S from "./styles";

import "./css/styles.scss";

export const InforProfile = () => {
  return (
    <div>
      <Tile>
        <S.Layout>
          <div style={{ flex: 1 }}>
            <S.Header>Personal Information</S.Header>
            <p>
              <a href="1" className="linkInforProfile">
                My Profile
              </a>
            </p>

            <p>
              <a href="2" className="linkInforProfile">
                Member Profile
              </a>
            </p>

            <p>
              <a href="3" className="linkInforProfile">
                Upload My Photo
              </a>
            </p>

            <p>
              <a href="4" className="linkInforProfile">
                Privacy Setting
              </a>
            </p>

            <p>
              <a href="5" className="linkInforProfile">
                Email Services
              </a>
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <S.Header>Account Security</S.Header>
            <p>
              <a href="6" className="linkInforProfile">
                Change Email Address
              </a>
            </p>

            <p>
              <a href="7" className="linkInforProfile">
                Change Password
              </a>
            </p>

            <p>
              <a href="8" className="linkInforProfile">
                Set Security Question
              </a>
            </p>

            <p>
              <a href="9" className="linkInforProfile">
                Manage Verification Phones
              </a>
            </p>

            <p>
              <a href="10" className="linkInforProfile">
                Manage My Connected Accounts
              </a>
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <S.Header>Finance Account</S.Header>
            <p>
              <a href="11" className="linkInforProfile">
                My Transactions Center
              </a>
            </p>
          </div>
        </S.Layout>
      </Tile>
    </div>
  );
};
