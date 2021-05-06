import { useAuth } from "@saleor/sdk";
import { NextPage } from "next";
import React from "react";

import { Redirect } from "@components/atoms";
import { paths } from "@paths";

import RegisterForm from "../OverlayManager/Login/RegisterForm";

const Register: NextPage = () => {
  const { user } = useAuth();

  return user ? <Redirect url={paths.home} /> : <RegisterForm />;
};

export default Register;
