import { UrlObject } from "url";

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
}

export interface IProps {
  url: UrlObject | string;
  as?: UrlObject | string;
  options?: TransitionOptions;
}
