export interface IProps {
  money?: {
    amount: number;
    currency: string;
  } | null;
  defaultValue?: string;
}
