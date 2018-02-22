import React from 'react';
import PropTypes from 'prop-types';

const Welcome = ({ username }) => <h2>Hi {username}, welcome back to Warbler.</h2>;

Welcome.propTypes = {
    username: PropTypes.string.isRequired,
};

export default Welcome;
