import { ApolloClient } from "apollo-client";
import * as React from "react";

import { getAuthToken, removeAuthToken, setAuthToken } from "../../core/auth";
import { UserContext, UserContextInterface } from "./context";
import { tokenVeryficationMutation } from "./queries";
import { TokenAuth_tokenCreate_user } from "./types/TokenAuth";

export default class UserProvider extends React.Component<
  {
    children: any;
    refreshUser: boolean;
    apolloClient: ApolloClient<any>;
    onUserLogin: () => void;
    onUserLogout: () => void;
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
      errors: null,
      loading: false,
      login: this.login,
      logout: this.logout,
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

  login = (token: string, user: TokenAuth_tokenCreate_user) => {
    this.setState({
      errors: null,
      loading: false,
      token,
      user
    });
    this.props.onUserLogin();
  };

  logout = () => {
    this.setState({ token: null, user: null });
    this.props.onUserLogout();
  };

  authenticate = async token => {
    const { apolloClient } = this.props;
    this.setState({ loading: true });
    const response = await apolloClient.mutate({
      mutation: tokenVeryficationMutation,
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
      this.setState({
        loading: false,
        user: data.user,
        token,
        errors: null
      });
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
