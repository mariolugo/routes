import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

export const Input = ({ label, placeholder, name, onChange, options, loading, setAddress }) => {
  const filterBy = () => true;
  return (
    <Form.Group controlId={`routeForm.${name}`}>
      <Form.Label>{label}</Form.Label>
      <AsyncTypeahead
        filterBy={filterBy}
        id="basic-typeahead-single"
        labelKey={'formatted_address'}
        onSearch={(e) => onChange(name, e)}
        options={options}
        placeholder={placeholder}
        isLoading={loading}
        paginate={false}
        minLength={3}
        onChange={(e) => {
          if (e && Array.isArray(e) && e.length > 0) {
            setAddress({
              address: e[0].formatted_address,
              location: e[0].geometry.location,
            });
          }
        }}
      />
    </Form.Group>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array,
  loading: PropTypes.bool,
  setAddress: PropTypes.func,
};
