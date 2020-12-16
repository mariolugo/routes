import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ label, value, placeholder, name }) => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        className="form-control"
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
};
