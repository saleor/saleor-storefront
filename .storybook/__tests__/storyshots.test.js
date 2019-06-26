import "jest-styled-components";
import initStoryshots from "@storybook/addon-storyshots";
import { multiSnapshotWithOptions } from "@storybook/addon-storyshots/dist/test-bodies";

initStoryshots({
  framework: "react",
  test: multiSnapshotWithOptions({})
});
