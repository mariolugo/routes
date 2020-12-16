import PropTypes from 'prop-types';

/**
 * This is the main app that has the redux and theme provider
 * @param {*} {Component} the main component
 * @param {*} {pageProps} pages properties.
 */
const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
