import { ApolloClient } from "apollo-client";
import * as React from "react";

import { getAuthToken, removeAuthToken, setAuthToken } from "../../core/auth";
import { OverlayType } from "../Overlay/context";
import { UserContext, UserContextInterface } from "./context";
import {
  CUSTOMER_REGISTER_MUTATION,
  PASSWORD_RESET_MUTATION,
  TOKEN_AUTH_MUTATION,
  TOKEN_VERIFICATION_MUTATION
} from "./queries";

export default class UserProvider extends React.Component<
  {
    children: any;
    refreshUser: boolean;
    apolloClient: ApolloClient<any>;
    tokenExpirationHandler?(callback: () => void): void;
  },
  UserContextInterface
> {
  constructor(props) {
    super(props);
    if (props.tokenExpirationHandler) {
      props.tokenExpirationHandler(this.logout);
    }
    const token = getAuthToken();
    this.state = {
      authenticate: this.authenticate,
      createCustomer: this.createCustomer,
      errors: null,
      loading: false,
      login: this.login,
      logout: this.logout,
      resetPassword: this.resetPassword,
      token,
      user: null
    };
  }

  componentDidMount = () => {
    const { token } = this.state;
    if (this.props.refreshUser && token) {
      this.authenticate(token);
    }
  };

  login = async (email, password, showNotification) => {
    const { apolloClient } = this.props;
    this.setState({ loading: true });
    const response = await apolloClient.mutate({
      mutation: TOKEN_AUTH_MUTATION,
      variables: { email, password }
    });

    const data = response.data.tokenCreate;
    if (data.errors) {
      this.setState({
        errors: data.errors,
        loading: false,
        user: null
      });
    } else {
      this.setState({
        errors: null,
        loading: false,
        token: data.token,
        user: data.user
      });
      if (showNotification) {
        showNotification(OverlayType.message, null, {
          title: "You are logged in"
        });
      }
    }
  };

  logout = showNotification => {
    this.setState({ token: null, user: null });
    if (showNotification) {
      showNotification(OverlayType.message, null, {
        title: "You are logged out"
      });
    }
  };

  resetPassword = async (email, showNotification) => {
    const { apolloClient } = this.props;
    this.setState({ loading: true });
    const response = await apolloClient.mutate({
      mutation: PASSWORD_RESET_MUTATION,
      variables: { email }
    });
    if (showNotification) {
      showNotification(OverlayType.message, null, {
        title: "Reset link is sent"
      });
    }
  };

  createCustomer = async (email, password, showNotification) => {
    const { apolloClient } = this.props;
    this.setState({ loading: true });
    const response = await apolloClient.mutate({
      mutation: CUSTOMER_REGISTER_MUTATION,
      variables: { email, password }
    });

    const data = response.data.customerRegister;

    if (data.errors.length) {
      this.setState({
        errors: data.errors,
        loading: false,
        user: null
      });
    } else {
      this.setState({
        errors: null,
        loading: false
      });
      if (showNotification) {
        showNotification(OverlayType.message, null, {
          title: "You are reggistered"
        });
      }
    }
  };

  authenticate = async token => {
    const { apolloClient } = this.props;
    this.setState({ loading: true });
    const response = await apolloClient.mutate({
      mutation: TOKEN_VERIFICATION_MUTATION,
      variables: { token }
    });
    const data = response.data.tokenVerify;
    if (data.errors) {
      this.setState({
        errors: data.errors,
        loading: false,
        token: null,
        user: null
      });
    } else {
      this.setState({ loading: false, user: data.user, token, errors: null });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.token) {
      setAuthToken(this.state.token);
    } else {
      removeAuthToken();
    }
  };

  render() {
    const { children } = this.props;
    return (
      <UserContext.Provider value={this.state}>{children}</UserContext.Provider>
    );
  }
}
