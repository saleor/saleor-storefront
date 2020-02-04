export interface IProps {
  loading: boolean;
  canLoadMore?: boolean;
  loadMoreText?: string;
  onLoadMore: () => void;
  children: React.ReactNode;
}
