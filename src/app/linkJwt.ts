import { setContext } from "apollo-link-context";
import { ErrorResponse, onError } from "apollo-link-error";

import { isJwtError, JWTError } from "./errors";

interface ResponseError extends ErrorResponse {
  networkError?: Error & {
    statusCode?: number;
    bodyText?: string;
  };
}

export const invalidateTokenLink = onError((error: ResponseError) => {
  if (
    (error.networkError && error.networkError.statusCode === 401) ||
    error.graphQLErrors?.some(isJwtError)
  ) {
    if (error.graphQLErrors[0].extensions.code !== JWTError.expired) {
      window.localStorage.setItem("token", "");
    }
  }
});

export const tokenLink = setContext((_, context) => {
  const authToken = window.localStorage.getItem("token");

  return {
    ...context,
    headers: {
      ...context.headers,
      Authorization: authToken ? `JWT ${authToken}` : null,
      STORE: "store_front",
    },
  };
});

const link = invalidateTokenLink.concat(tokenLink);

export default link;
