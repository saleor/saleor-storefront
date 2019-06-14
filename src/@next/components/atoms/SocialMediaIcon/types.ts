interface Medium {
  ariaLabel: string;
  path: string;
  href: string;
}

export interface IProps {
  medium: Medium;
  target?: string;
}
