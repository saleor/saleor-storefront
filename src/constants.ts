export const apiUrl = process.env.API_URI || "/graphql/";
export const serviceWorkerTimeout =
  parseInt(process.env.SERVICE_WORKER_TIMEOUT, 10) || 60 * 1000;
