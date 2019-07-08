export type TextStyle = "title" | "paragraph";
export type TitleSize = "md" | "lg";

export interface IProps {
  children: React.ReactNode;
  closeIcon?: boolean;
  divider?: boolean;
  customIcon?: React.ReactNode;
  onHide?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  textStyle?: TextStyle;
  titleSize?: TitleSize;
}
