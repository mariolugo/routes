import Head from 'next/head';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Layout } from '../components';

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
            Search{' '}
          </Col>
          <Col
            xs={12}
            md={8}
            style={{
              backgroundColor: 'black',
              height: 'calc(100vh - 56px)',
              overflow: 'hidden',
            }}>
            {' '}
            Mapa
          </Col>
        </Row>
      </Layout>
    </div>
  );
};

export default Home;
