export interface IProps {
  description?: string;
  descriptionJson?: string;
  attributes?: Array<{
    attribute: { 
      name: string ,
      translation: {
        name: string ,
      }
    };
    values: Array<{ 
      name: string,
      translation: {
        name: string ,
      }
    }>;
  }>;
}
