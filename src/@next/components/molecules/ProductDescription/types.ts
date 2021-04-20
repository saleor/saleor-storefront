export interface IProps {
  description?: string;
  store?: any;
  attributes?: Array<{
    attribute: { name: string };
    values: Array<{ name: string }>;
  }>;
}
