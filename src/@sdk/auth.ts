import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { ErrorResponse, onError } from "apollo-link-error";

export const authEvent = new Event("auth");

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem("token");
  } catch {
    return null;
  }
}

export function setAuthToken(token: string) {
  localStorage.setItem("token", token);
  dispatchEvent(authEvent);
}

export function removeAuthToken() {
  localStorage.removeItem("token");
  dispatchEvent(authEvent);
}

interface ResponseError extends ErrorResponse {
  networkError?: Error & {
    statusCode?: number;
    bodyText?: string;
  };
}

// possibly remove callback here and use event emitter
export const invalidTokenLink = (): { invalidLink: ApolloLink } => {
  const invalidLink = onError((error: ResponseError) => {
    if (error.networkError && error.networkError.statusCode === 401) {
      removeAuthToken();
    }
  });
  return { invalidLink };
};

export const authLink = setContext((_, context) => {
  const authToken = getAuthToken();
  if (authToken) {
    return {
      ...context,
      headers: {
        ...context.headers,
        Authorization: authToken ? `JWT ${authToken}` : null,
      },
    };
  } else {
    return context;
  }
});
