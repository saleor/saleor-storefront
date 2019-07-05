export interface IProps {
  title: string;
  status?: "neutral" | "success" | "error";
  onClick: () => void;
  children?: React.ReactNode;
  actionText?: string;
}
