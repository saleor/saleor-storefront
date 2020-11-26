export type TextStyle = "title" | "paragraph";
export type TitleSize = "md" | "lg";

export interface IProps {
  children: React.ReactNode;
  divider?: boolean;
  prefix?: React.ReactNode;
  closeIcon?: React.ReactNode;
  onHide?: () => void;
  textStyle?: TextStyle;
  titleSize?: TitleSize;
}
