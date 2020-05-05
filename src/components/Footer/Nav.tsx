import * as React from "react";

import "./scss/index.scss";

import { Link } from "@temp/@next/components/atoms/SocialMediaIcon/styles";

const MAIN_MENU = [{
  href: '/',
  title: 'Home',
}, {
  href: '/cart',
  title: 'Cart',
}, {
  href: '/account',
  title: 'Account',
}, {
  href: '/more',
  title: 'More',
}];

class Nav extends React.PureComponent {
  render() {
    return (
      <footer className="footer-nav">
        {MAIN_MENU.map(item => {
          return  <MenuItem item={item} />
        })}
      </footer>
    );
  }
}

function MenuItem({item}) {
  return <Link className="menu-item" href={item.href}>
    <span>{item.title}</span>
  </Link>
}

export default Nav;
