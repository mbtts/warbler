import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavItem = ({ item, className }) => (
    <li className={className}>
        <NavLink to={`/${item.id}`} activeClassName='current'>
            {item.id}
        </NavLink>
    </li>
);

NavItem.propTypes = {
    navItem: PropTypes.shape({
        id: PropTypes.string.isRequired,
        handler: PropTypes.func.isRequired,
    }),
    className: PropTypes.string
};

export default NavItem;
