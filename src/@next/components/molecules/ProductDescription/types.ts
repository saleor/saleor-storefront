export interface IProps {
  description?: string;
  attributes?: Array<{
    attribute: { name: string };
    values: Array<{ name: string }>;
  }>;
}
