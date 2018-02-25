import NavItem from "./NavItem";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

const Nav = ({ navItems }) => {
  const nav = (
    <nav>
      <ul>{navItems && navItems.map(e => <NavItem key={e.id} item={e} />)}</ul>
    </nav>
  );

  return (
    <header>
      <h1>Warbler</h1>
      {navItems && nav}
    </header>
  );
};

Nav.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => ({
  navItems: state.navItems.map(e => ({ id: e }))
});

export default connect(mapStateToProps)(Nav);
