import { QueuedJobsHandler } from "../QueuedJobsHandler";

export enum ErrorCheckoutTypes {}

export class CheckoutQueuedJobs extends QueuedJobsHandler<ErrorCheckoutTypes> {}
