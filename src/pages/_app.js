import PropTypes from 'prop-types';
import Head from 'next/head';
import { GOOGLE_MAPS_API_URL } from '../constants';

import '../styles/global.css';

/**
 * This is the main app that has the redux and theme provider
 * @param {*} {Component} the main component
 * @param {*} {pageProps} pages properties.
 */
const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <script type="text/javascript" src={GOOGLE_MAPS_API_URL} />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
