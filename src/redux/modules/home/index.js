import { HomeData } from '../../../models';
import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { GOOGLE_MAPS_KEY } from '../../../constants';

// creating an immutable initial state
const initialState = new HomeData();

//ACTION TYPES

// declared the actions types that we are going to use
const FETCH_ADDRESS = 'modules/home/FETCH_ADDRESS';
const FETCH_ADDRESS_SUCCESS = 'modules/home/FETCH_ADDRESS_SUCCESS';
const FETCH_ADDRESS_ERROR = 'modules/home/FETCH_ADDRESS_ERROR';
const SELECT_ADDRESS = 'modules/home/SELECT_ADDRESS';
const START_CALCULATE = 'modules/home/START_CALCULATE';
const FINISH_CALCULATE = 'modules/home/FINISH_CALCULATE';

// STATE IMMUTABLE HELPERS

/**
 *
 * @param {*} state
 */
const onFetch = (state, field) =>
  state.merge({
    ...state,
    [field]: {
      selected: null,
      coordinates: null,
      fetching: true,
      results: [],
    },
  });

/**
 *
 * @param {*} state
 * @param {*} {payload}
 */
const onFetchSuccess = (state, payload) =>
  state.merge({
    ...state,
    [payload.field]: {
      selected: null,
      coordinates: null,
      fetching: false,
      results: payload.data.candidates,
    },
  });

/**
 *
 * @param {*} state
 * @param {*} {error}
 */
const onFetchError = (state, { error }) =>
  state.merge({ fetching: false, fetchStatus: 500, fetchErrorMessage: error });

/**
 *
 * @param {*} state
 * @param {*} {payload}
 */
const onSelectAddress = (state, field, address, location) =>
  state.merge({
    ...state,
    [field]: {
      selected: address,
      coordinates: {
        lat: location.lat,
        lng: location.lng,
      },
      fetching: false,
      results: [],
    },
  });

const onStartCalculate = (state) =>
  state.merge({
    ...state,
    doSearch: true,
  });

const onFinishCalculate = (state, routes) =>
  state.merge({
    ...state,
    doSearch: false,
    routes,
  });
// MAIN REDUCERS

/**
 *
 * @param {*} state
 * @param {*} action
 */

export default function reducer(
  state = initialState,
  { type, routes, location, address, field, payload },
) {
  switch (type) {
    case FETCH_ADDRESS:
      return onFetch(state, field);

    case FETCH_ADDRESS_SUCCESS:
      return onFetchSuccess(state, payload);

    case FETCH_ADDRESS_ERROR:
      return onFetchError(state, payload);

    case SELECT_ADDRESS:
      return onSelectAddress(state, field, address, location);

    case START_CALCULATE:
      return onStartCalculate(state);

    case FINISH_CALCULATE:
      return onFinishCalculate(state, routes);
    default:
      return state;
  }
}

// ACTIONS CREATORS

/**
 *
 */
export const fetchAddress = (field, query) => ({
  type: FETCH_ADDRESS,
  field,
  query,
});

/**
 *
 * @param {*} data
 */
export const fetchAddressSuccess = (data) => ({
  type: FETCH_ADDRESS_SUCCESS,
  payload: data,
});

/**
 *
 * @param {*} error
 */
export const fetchAddressError = (error) => ({
  type: FETCH_ADDRESS_ERROR,
  error,
});

/**
 *
 * @param {*} field
 * @param {*} address
 * @param {*} location
 */
export const selectAddress = (field, address, location) => ({
  type: SELECT_ADDRESS,
  field,
  address,
  location,
});

export const startCalculate = () => ({
  type: START_CALCULATE,
});

export const finishCalculate = (routes) => ({
  type: FINISH_CALCULATE,
  routes,
});

//SAGAS

/**
 *
 * @param {*} api
 * In here we call the api and dispatch either a succes or error action
 */
export function* getAddressWorker(api, action) {
  const url = `json?input=${encodeURIComponent(
    action.query,
  )}&inputtype=textquery&fields=formatted_address,geometry&key=${GOOGLE_MAPS_KEY}`;

  try {
    const homesResponse = yield call(api.get, url);
    const successAction = fetchAddressSuccess({
      data: homesResponse.data,
      field: action.field,
    });
    yield put(successAction);
  } catch (e) {
    const errorAction = fetchAddressError(e);
    yield put(errorAction);
  }
}

/**
 *
 * @param {*} api
 * Spawns a saga on each action dispatched to the Store that matches pattern.
 */
function* watchAddress(api) {
  yield takeEvery(FETCH_ADDRESS, getAddressWorker, api);
}

/**
 *
 * @param {*} api
 * Creates an Effect description that instructs the middleware to perform a non-blocking call
 */
export function* root(api) {
  yield fork(watchAddress, api);
}

// SELECTORS
export const getHighlight = (state) => state.home.get('highlight');
export const getRoutes = (state) => state.home.get('routes');
export const getOrigin = (state) => state.home.get('origin');
export const getDestination = (state) => state.home.get('destination');
export const getOrderBy = (state) => state.home.get('orderBy');
export const getDoSearch = (state) => state.home.get('doSearch');
