import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

export const Input = ({ label, value, placeholder, name }) => {
  return (
    <Form.Group controlId={`routeForm.${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type="text" placeholder={placeholder} name={name} value={value} />
    </Form.Group>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
};
