import React, { useState } from "react";

import * as S from "./styles";
import { IProps } from "./types";

const statuses = [
  { token: "charged", label: "Charged" },
  { token: "fully-refunded", label: "Fully refunded" },
  { token: "not-charged", label: "Not charged" },
];

/**
 * Dummy payment gateway.
 */
const DummyPaymentGateway: React.FC<IProps> = ({}: IProps) => {
  const [selectedStatus, setSelectedStatus] = useState(statuses[0]);
  return <S.Wrapper>{/* --- here --- */}</S.Wrapper>;
};

export { DummyPaymentGateway };
