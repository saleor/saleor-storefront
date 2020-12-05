import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { IProps } from "./types";

export const Redirect: React.FC<IProps> = ({ options, as, url }) => {
  const { push } = useRouter();

  useEffect(() => {
    push(url, as, options);
  }, []);

  return <></>;
};
