import React from 'react';
import BootstrapButton from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export const Button = ({ title, disabled, onClick }) => {
  return (
    <BootstrapButton variant="primary" size="lg" block disabled={disabled} onClick={onClick}>
      {title}
    </BootstrapButton>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
