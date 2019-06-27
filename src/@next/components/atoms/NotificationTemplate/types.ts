type NotificationTypes = "neutral" | "success" | "error" | "action";

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
