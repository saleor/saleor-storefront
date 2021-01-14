import { createBrowserHistory, History } from "history";

import { ssrMode } from "@temp/constants";

const history = (() => {
  if (ssrMode) {
    return {};
  }
  const history = createBrowserHistory();
  history.listen((_location, action) => {
    if (["PUSH"].includes(action)) {
      window.scroll({
        behavior: "smooth",
        top: 0,
      });
    }
  });
  return history;
})() as History;

export { history };
