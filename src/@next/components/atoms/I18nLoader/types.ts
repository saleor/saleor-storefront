
export interface IProps {
  children: React.ReactNode,
  languages: any,
}

export interface II18nContext {
  language: string,
  languages: any,
  catalogs: any,
  setLanguage: React.Dispatch<any>
}
