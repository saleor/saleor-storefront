export interface MenuItem {
  content: React.ReactNode;
  onClick: () => void;
}

export interface IProps {
  type: "hoverable" | "clickable";
  header: React.ReactNode;
  items: MenuItem[];
}
