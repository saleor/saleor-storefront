import urljoin from "url-join";

export const apiUrl = urljoin(process.env.BACKEND_URL || "/", "/graphql/");
export const serviceWorkerTimeout = parseInt(process.env.SERVICE_WORKER_TIMEOUT, 10) || 60 * 1000;
