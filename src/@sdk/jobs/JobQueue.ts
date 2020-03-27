import { IJobsModel, LocalRepository } from "../repository";
import { IJobQueue, LocalStorageJobs } from "./types";

export const JobsModelInitialState: IJobsModel = {
  cart: {
    setCartItem: false,
  },
  checkout: {
    setShippingAddress: false,
  },
};

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

  protected updateJobsStateInRepository<T extends keyof IJobsModel>(
    groupStateJobsToUpdate: IJobsModel[T],
    repository: LocalRepository,
    jobsGroup: T
  ) {
    let jobs = repository.getJobs();

    if (!jobs) {
      jobs = JobsModelInitialState;
    }

    repository.setJobs({
      ...jobs,
      [jobsGroup]: {
        ...jobs[jobsGroup],
        ...groupStateJobsToUpdate,
      },
    });
  }

  protected enqueueAllSavedInRepository(
    queuePossibilities: Map<string, () => any>,
    repository: LocalRepository,
    jobsGroup: keyof IJobsModel
  ) {
    const jobs = repository.getJobs();

    if (jobs) {
      const jobsGroupObject = jobs[jobsGroup];
      const jobsGroupObjectJobsNames = Object.keys(jobsGroupObject) as Array<
        keyof typeof jobsGroupObject
      >;

      jobsGroupObjectJobsNames
        .filter(name => jobsGroupObject[name])
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
