import Head from 'next/head';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Layout, Input, Button, Filter, Route, Map } from '../components';

const Home = () => {
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
              <Input label="¿DE DÓNDE SALES?" placeholder="Origen" name="routesFrom" />
              <Input label="¿A DÓNDE TE DIRIGES?" placeholder="Destino" name="routesTo" />
              <Button title="BUSCAR RUTA" />
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
