export type TextStyle = "title" | "paragraph";
export type TitleSize = "md" | "lg";

export interface IProps {
  closeIcon?: boolean;
  divider?: boolean;
  customIcon?: any;
  text: string;
  textStyle?: TextStyle;
  titleSize?: TitleSize;
}
