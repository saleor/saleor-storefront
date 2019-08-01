export type IconName =
  | "arrow_back"
  | "edit"
  | "expand"
  | "plus"
  | "social_facebook"
  | "social_instagram"
  | "social_twitter"
  | "social_youtube"
  | "tick"
  | "trash"
  | "x";

export interface IProps {
  name: IconName;
  color?: string | string[];
  size?: number;
}

export interface IIconDefinition {
  d: string;
  fill: string;
  stroke?: string;
  strokeLinejoin?: "miter" | "round" | "bevel" | "inherit";
  strokeWidth?: string;
  viewBox?: string;
}
