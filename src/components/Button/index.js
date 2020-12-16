import React from 'react';
import BootstrapButton from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export const Button = ({ title }) => {
  return (
    <BootstrapButton variant="primary" size="lg" block>
      {title}
    </BootstrapButton>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
};
