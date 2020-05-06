import { ApolloClient } from "apollo-client";
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

export function clearStorage(): void {
  localStorage.clear();
  dispatchEvent(authEvent);
}

export function fireSignOut(client?: ApolloClient<any>): void {
  clearStorage();
  if (navigator.credentials && navigator.credentials.preventSilentAccess) {
    navigator.credentials.preventSilentAccess();
  }
  if (client) {
    client.resetStore();
  }
}

interface ResponseError extends ErrorResponse {
  networkError?: Error & {
    statusCode?: number;
    bodyText?: string;
  };
}

// possibly remove callback here and use event emitter
export const invalidTokenLinkWithTokenHandler = (
  tokenExpirationCallback: () => void
): {
  link: ApolloLink;
} => {
  const link = onError((error: ResponseError) => {
    const isTokenExpired = error.graphQLErrors?.some(
      error => error.extensions?.exception?.code === "JSONWebTokenExpired"
    );
    if (
      isTokenExpired ||
      (error.networkError && error.networkError.statusCode === 401)
    ) {
      tokenExpirationCallback();
    }
  });
  return { link };
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
