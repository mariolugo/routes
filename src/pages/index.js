import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';

import { Layout, Input, Button, Filter, Route, Map } from '../components';
import { fetchAddress, selectAddress, getOrigin, getDestination } from '../redux/modules/home';

const Home = () => {
  const [originAddress, setOriginAddress] = useState({
    address: '',
    location: '',
  });
  const [destinationAddress, setDestinationAddress] = useState({
    address: '',
    location: '',
  });
  const dispatch = useDispatch();
  const origin = useSelector(getOrigin);
  const destination = useSelector(getDestination);

  console.log('origin', origin);
  console.log('originAddress', originAddress);
  console.log('destinationAddress', destinationAddress);

  const searchAddress = (field, query) => {
    dispatch(fetchAddress(field, query));
  };

  const isButtonDisabled = () => {
    if (origin.coordinates && destination.coordinates) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (originAddress.address.length > 0) {
      dispatch(selectAddress('origin', originAddress.address, originAddress.location));
    }
  }, [originAddress]);

  useEffect(() => {
    if (destinationAddress.address.length > 0) {
      dispatch(
        selectAddress('destination', destinationAddress.address, destinationAddress.location),
      );
    }
  }, [destinationAddress]);

  return (
    <div>
      <Head>
        <title>Routes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Row>
          <Col xs={12} md={4}>
            <div className="routes-form">
              <Input
                label="¿DE DÓNDE SALES?"
                placeholder="Origen"
                name="origin"
                onChange={searchAddress}
                options={origin.results}
                value={originAddress}
                loading={origin.fetching}
                setAddress={setOriginAddress}
              />
              <Input
                label="¿A DÓNDE TE DIRIGES?"
                placeholder="Destino"
                name="destination"
                onChange={searchAddress}
                options={destination.results}
                value={destinationAddress}
                loading={destination.fetching}
                setAddress={setDestinationAddress}
              />
              <Button title="BUSCAR RUTA" disabled={isButtonDisabled()} />
            </div>
            <div className="routes-results">
              <Filter />
              <div className="results-list">
                <Route />
              </div>
            </div>
          </Col>
          <Col
            xs={12}
            md={8}
            style={{
              backgroundColor: 'black',
              height: 'calc(100vh - 56px)',
              overflow: 'hidden',
              padding: 0,
            }}>
            <Map zoom={12} />
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Home;
