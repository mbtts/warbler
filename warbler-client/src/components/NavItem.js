import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

const NavItem = ({ item }) => (
  <li>
    <NavLink to={`/${item.id}`} activeClassName="current">
      {item.id}
    </NavLink>
  </li>
);

NavItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired
};

export default NavItem;
