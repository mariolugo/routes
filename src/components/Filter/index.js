import React from 'react';
import Form from 'react-bootstrap/Form';

export const Filter = () => {
  return (
    <Form.Group controlId="exampleForm.SelectCustom">
      <Form.Label>Ordenar por</Form.Label>
      <Form.Control as="select" custom>
        <option>Distance</option>
        <option>KM</option>
      </Form.Control>
    </Form.Group>
  );
};

Filter.propTypes = {};
