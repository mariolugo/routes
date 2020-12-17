import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
// import PropTypes from 'prop-types';

export const Route = () => {
  return (
    <Card body bg="light" variant="light">
      <Row>
        <Col xs={12}>
          <Row className="directions-row">
            <Col xs={8}>
              <p className="route-direction"> Pedro A de los Santos 123</p>
              <p className="route-coordinates">@ 19.5555, -99.500000</p>
            </Col>
            <Col xs={4}>
              <p className="route-info"> 55 min</p>
              <p className="route-info-text">de viaje</p>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <p className="route-direction">Sobre Prol. Paseo de la Reforma</p>
              <p className="route-coordinates">@ 19.5555, -99.500000</p>
            </Col>
            <Col xs={4}>
              <p className="route-info"> 12.56km</p>
              <p className="route-info-text">de viaje</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

Route.propTypes = {};
