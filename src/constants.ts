export const apiUrl = process.env.NEXT_PUBLIC_API_URI!;

export const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

const sampleRate = parseFloat(process.env.NEXT_PUBLIC_SENTRY_APM || "");

export const sentrySampleRate = isNaN(sampleRate) ? 0 : sampleRate;

export const serviceWorkerTimeout =
  parseInt(process.env.SERVICE_WORKER_TIMEOUT || "", 10) || 60 * 1000;

export const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export const channelSlug = process.env.NEXT_PUBLIC_SALEOR_CHANNEL_SLUG!;

export const exportMode = process.env.NEXT_EXPORT === "true";

export const ssrMode = typeof window === "undefined";

export const incrementalStaticRegenerationRevalidate = parseInt(
  process.env.INCREMENTAL_STATIC_REGENERATION_REVALIDATE!,
  10
);

export const staticPathsFetchBatch = 50;

export const staticPathsFallback = (exportMode
  ? false
  : process.env.NEXT_PUBLIC_STATIC_PATHS_FALLBACK) as boolean | "blocking";

export const paymentGatewayNames = {
  dummy: "mirumee.payments.dummy",
  adyen: "mirumee.payments.adyen",
  stripe: "saleor.payments.stripe",
};
