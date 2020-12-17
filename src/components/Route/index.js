import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

export const Route = ({ origin, destination, info }) => {
  const originAddress = origin.address.split(',').splice(0, 2).join();
  const destinationAddress = destination.address.split(',').splice(0, 2).join();
  return (
    <Card body bg="light" variant="light" className="route-card">
      <Row>
        <Col xs={12}>
          <Row className="directions-row">
            <Col xs={8}>
              <p className="route-direction"> {originAddress}</p>
              <p className="route-coordinates">
                @ {origin.location.lat}, {origin.location.lat}
              </p>
            </Col>
            <Col xs={4}>
              <p className="route-info"> {info.legs[0].duration.text}</p>
              <p className="route-info-text">de viaje</p>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <p className="route-direction">
                {destinationAddress} <strong>sobre</strong> {info.summary}
              </p>
              <p className="route-coordinates">
                @ {destination.location.lat}, {destination.location.lat}
              </p>
            </Col>
            <Col xs={4}>
              <p className="route-info"> {info.legs[0].distance.text}</p>
              <p className="route-info-text">de viaje</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

Route.propTypes = {
  origin: PropTypes.object,
  destination: PropTypes.object,
  info: PropTypes.object,
};
