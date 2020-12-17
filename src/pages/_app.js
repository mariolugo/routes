import PropTypes from 'prop-types';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { GOOGLE_MAPS_API_URL } from '../constants';
import { useStore } from '../redux/store';
import '../styles/global.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

/**
 * This is the main app that has the redux and theme provider
 * @param {*} {Component} the main component
 * @param {*} {pageProps} pages properties.
 */
const App = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  return (
    <>
      <Head>
        <script type="text/javascript" src={GOOGLE_MAPS_API_URL} />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
