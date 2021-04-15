import React from "react";

import { AccountTile } from "./AccountTile";
import { InforProfile } from "./InforProfile";
import { PasswordTile } from "./PasswordTile";
import { ProfileUser } from "./ProfileUser";

export const AccountTabTiles: React.FC = () => (
  <div>
    <ProfileUser />
    <AccountTile />
    <PasswordTile />
    <InforProfile />
  </div>
);
