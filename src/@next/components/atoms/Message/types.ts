export interface IProps {
  title: string;
  status?: "neutral" | "success" | "error";
  onClose: () => void;
}
