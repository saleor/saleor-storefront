import { IJobsModel, LocalRepository } from "../repository";
import { IJobQueue, LocalStorageJobs } from "./types";

export class JobQueue implements IJobQueue {
  private queue: Map<
    LocalStorageJobs,
    {
      func: () => any;
      onFinish: () => any;
    }
  >;

  constructor() {
    this.queue = new Map();
    window.addEventListener("online", this.onOnline);
  }

  addToQueue(
    name: LocalStorageJobs,
    func: () => any,
    onPending: () => any,
    onFinish: () => any
  ) {
    if (navigator.onLine) {
      func();
      return onFinish();
    } else {
      if (this.queue.has(name)) {
        this.queue.set(name, { func, onFinish });
      }
      return onPending();
    }
  }

  protected enqueueAllSavedInRepository(
    queuePossibilities: Map<string, () => any>,
    repository: LocalRepository,
    jobsName: keyof IJobsModel
  ) {
    const jobs = repository.getJobs();

    if (jobs) {
      const jobCategory = jobs[jobsName];
      const jobCategoryJobsNames = Object.keys(jobCategory) as Array<
        keyof typeof jobCategory
      >;

      jobCategoryJobsNames
        .filter(name => jobCategory[name])
        .forEach(name => {
          const queueFunc = queuePossibilities.get(name);
          if (queueFunc) {
            queueFunc();
          }
        });
    }
  }

  private onOnline() {
    this.queue.forEach(({ func, onFinish }, name) => {
      func();
      onFinish();
    });
    this.queue = new Map();
  }
}
