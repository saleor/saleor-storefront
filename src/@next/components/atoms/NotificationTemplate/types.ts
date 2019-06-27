type NotificationTypes = "neutral" | "success" | "error";

interface IMessage {
  actionText?: string;
  content?: string;
  title: string;
}

interface IOptions {
  type: NotificationTypes;
}

export interface IProps {
  id: string;
  style: React.CSSProperties;
  message: IMessage;
  options: IOptions;
  close: () => void;
}
