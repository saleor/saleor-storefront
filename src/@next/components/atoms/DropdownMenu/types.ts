export interface MenuItem {
  content: React.ReactNode;
  testingContext?: string;
  onClick: () => void;
}

export interface IProps {
  type: "hoverable" | "clickable";
  header: React.ReactNode;
  items: MenuItem[];
}
