export type TextStyle = "title" | "paragraph";
export type TitleSize = "md" | "lg";

export interface IProps {
  closeIcon?: boolean;
  divider?: boolean;
  customIcon?: React.ReactNode;
  onHide?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
  textStyle?: TextStyle;
  titleSize?: TitleSize;
}
