import "./scss/navigation.scss";


import React from 'react';
import { Link } from 'react-router-dom';

export interface IUserAccountNavigation {
    links: string[];
}

const UserAccountNavigation: React.FC<IUserAccountNavigation> = ({links}) => {
    return (
        <div className="user-account-navigation">
           {links.map((element) => <Link to={element} className="user-account-navigation__link">{element.replace("-", " ").toUpperCase()}</Link>)}
        </div>
    )
};

export default UserAccountNavigation