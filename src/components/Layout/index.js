import React from 'react';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import { NavBar } from '../NavBar';

export const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Container fluid>{children}</Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
