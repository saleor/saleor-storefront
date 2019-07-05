export interface IProps {
  children: Node
}

export interface II18nContext {
  language: string,
  catalogs: any,
  setLanguage: React.Dispatch<any>
}
