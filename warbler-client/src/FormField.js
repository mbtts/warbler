import React from 'react';
import PropTypes from 'prop-types';

const FormField = ({ label, name, value, type, onChange }) => (
    <p>
        <label htmlFor={name}>{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            onChange={onChange}
            value={value}
            autoComplete='off'
            placeholder={`${label}…`}
        />
    </p>
);

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
}

FormField.defaultProps = {
    type: 'text'
}

export default FormField;
