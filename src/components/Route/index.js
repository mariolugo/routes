import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
// import PropTypes from 'prop-types';

export const Route = () => {
  return (
    <Card body bg="light" variant="light">
      <Row>
        <Col xs={12} md={2}>
          img
        </Col>
        <Col xs={12} md={10}>
          <Row>
            <Col xs={12} md={8}>
              Pedro A de los Santos 123
            </Col>
            <Col xs={12} md={4}>
              55min
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={8}>
              Sobre Prol. Paseo de la Reforma
            </Col>
            <Col xs={12} md={4}>
              12.56km
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

Route.propTypes = {};
