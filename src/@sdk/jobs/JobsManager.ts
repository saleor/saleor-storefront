import { ApolloClientManager } from "../data/ApolloClientManager";
import { LocalStorageHandler } from "../helpers/LocalStorageHandler";
import { IJobs, Jobs } from "./Jobs";
import { IQueuedJobs, QueuedJobs } from "./QueuedJobs";
import { JobFunctionParameters, QueuedJobFunctionParameters } from "./types";

export class JobsManager {
  private queue: Array<{
    jobGroup: string;
    jobName: string;
  }>;
  private localStorageHandler: LocalStorageHandler;

  private jobs: IJobs;
  private queuedJobs: IQueuedJobs;

  constructor(
    localStorageHandler: LocalStorageHandler,
    apolloClientManager: ApolloClientManager
  ) {
    this.queue = new Array<{
      jobGroup: string;
      jobName: string;
    }>();
    this.localStorageHandler = localStorageHandler;

    this.jobs = new Jobs(this.localStorageHandler, apolloClientManager);
    this.queuedJobs = new QueuedJobs(
      this.localStorageHandler,
      apolloClientManager
    );

    this.enqueueAllSavedInRepository();

    window.addEventListener("online", this.onOnline);
  }

  /**
   * Executes job immediately and returns result or error.
   * @param jobGroup Job group name referencing to the class with job functions.
   * @param jobName Jobs within group/class.
   * @param params Object passed as the first argument to the job function.
   */
  run<G extends keyof IJobs, J extends keyof IJobs[G], P extends IJobs[G][J]>(
    jobGroup: G,
    jobName: J,
    params: JobFunctionParameters<G, J, P>[0]
  ) {
    const func = this.jobs[jobGroup][jobName];

    if (typeof func === "function") {
      return func(params);
    }
  }

  /**
   * Add job to the queue. If there is an internet connection available, job is executed immediatelly.
   * Otherwise job is inserted into the queue and delayed until internet connection will be restored.
   * Queue is persisted in local storage.
   * @param jobGroup Job group name referencing to the class with job functions.
   * @param jobName Jobs within group/class.
   */
  addToQueue<G extends keyof IQueuedJobs, J extends keyof IQueuedJobs[G]>(
    jobGroup: G,
    jobName: J
  ) {
    if (navigator.onLine) {
      this.runJob(jobGroup, jobName);
    } else {
      this.enqueueJob(jobGroup, jobName);
    }
  }

  /**
   * Attach error listener to the queued job group.
   * @param jobGroup Job group name referencing to the class with job functions.
   * @param onErrorListener Function to be called if error will occur during job execution.
   */
  attachErrorListener<
    G extends keyof IQueuedJobs,
    P extends IQueuedJobs[G]["attachErrorListener"]
  >(
    jobGroup: G,
    onErrorListener: QueuedJobFunctionParameters<G, "attachErrorListener", P>[0]
  ) {
    const typedErrorListener = onErrorListener as P;

    this.queuedJobs[jobGroup].attachErrorListener(typedErrorListener);
  }

  private runJob<G extends keyof IQueuedJobs, J extends keyof IQueuedJobs[G]>(
    jobGroup: G,
    jobName: J
  ) {
    const func = this.queuedJobs[jobGroup][jobName];

    if (typeof func === "function") {
      func();
    }

    this.dequeueJob(jobGroup, jobName);
  }

  private enqueueJob<
    G extends keyof IQueuedJobs,
    J extends keyof IQueuedJobs[G]
  >(jobGroup: G, jobName: J) {
    const methodName = jobName.toString();

    const jobAlreadyQueued = this.queue.some(
      item => item.jobGroup === jobGroup && item.jobName === jobName
    );

    if (!jobAlreadyQueued) {
      this.queue.push({ jobGroup, jobName: methodName });
      this.updateJobStateInRepository(jobGroup, jobName, true);
    }
  }

  private dequeueJob<
    G extends keyof IQueuedJobs,
    J extends keyof IQueuedJobs[G]
  >(jobGroup: G, jobName: J) {
    const methodName = jobName.toString();

    this.queue.filter(
      item => item.jobGroup !== jobGroup || item.jobName !== methodName
    );
    this.updateJobStateInRepository(jobGroup, jobName, false);
  }

  private onOnline = () => {
    this.queue.forEach(item => {
      const jobGroup = item.jobGroup as keyof IQueuedJobs;
      const jobName = item.jobName as keyof QueuedJobs[keyof IQueuedJobs];

      this.runJob(jobGroup, jobName);
    });

    this.queue = [];
  };

  private updateJobStateInRepository<
    G extends keyof IQueuedJobs,
    J extends keyof IQueuedJobs[G]
  >(jobGroup: G, jobName: J, state: boolean) {
    let jobs = this.localStorageHandler.getJobs();

    if (!jobs) {
      jobs = null;
    }

    const jobGroupString = jobGroup.toString();
    const jobNameString = jobName.toString();

    const jobGroupObject = jobs ? jobs[jobGroup] : null;

    this.localStorageHandler.setJobs({
      ...jobs,
      [jobGroupString]: {
        ...jobGroupObject,
        [jobNameString]: state,
      },
    });
  }

  private enqueueAllSavedInRepository() {
    const jobs = this.localStorageHandler.getJobs();

    if (jobs) {
      Object.keys(jobs).forEach(jobGroupString => {
        const jobGroupKey = jobGroupString as keyof IQueuedJobs;
        const jobGroup = jobs[jobGroupKey];

        if (jobGroup) {
          Object.keys(jobGroup).forEach(jobNameString => {
            const jobNameKey = jobNameString as keyof QueuedJobs[keyof IQueuedJobs];
            const jobNameState = jobGroup[jobNameKey];

            if (jobNameState) {
              this.addToQueue(
                jobGroupString as keyof IQueuedJobs,
                jobNameString as keyof QueuedJobs[keyof IQueuedJobs]
              );
            }
          });
        }
      });
    }
  }
}
