import React from 'react';
import PropTypes from 'prop-types';
import NavItem from './NavItem';

const Nav = ({ navItems }) => {
    const nav = (<nav>
        <ul>
            {navItems.map(e => <NavItem key={e.id} item={e} />)}
        </ul>
    </nav>);

    return (
        <header>
            <h1>Warbler</h1>
            {navItems.length > 0 && nav}
        </header>
    )
};

Nav.propTypes = {
    navItems: PropTypes.arrayOf(PropTypes.object),
};

export default Nav;
