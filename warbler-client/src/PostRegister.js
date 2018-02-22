import React from 'react';
import PropTypes from 'prop-types';

const PostRegister = ({ username }) => (
    <React.Fragment>
        <h2>Hi {username}, thank you for signing up to Warbler.</h2>
        <p>Below are some tips to get started:</p>
        <ol>
            <li>Don't pick up the phone, you know he's only calling because he's drunk and alone.</li>
            <li>Don't let him in, you'll only have to kick him out again.</li>
            <li>If you're under him, then you ain't getting over him.</li>
        </ol>
    </React.Fragment>
);

PostRegister.propTypes = {
    username: PropTypes.string.isRequired,
};

export default PostRegister;
