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

// STATE IMMUTABLE HELPERS

/**
 *
 * @param {*} state
 */
const onFetch = (state) =>
  state.merge({
    fetching: true,
  });

/**
 *
 * @param {*} state
 * @param {*} {payload}
 */
const onFetchSuccess = (state, payload) => {
  let newState = state;

  console.log('payload', payload);
  return newState;
};

/**
 *
 * @param {*} state
 * @param {*} {error}
 */
const onFetchError = (state, { error }) =>
  state.merge({ fetching: false, fetchStatus: 500, fetchErrorMessage: error });

// MAIN REDUCERS

/**
 *
 * @param {*} state
 * @param {*} action
 */

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_ADDRESS:
      return onFetch(state);

    case FETCH_ADDRESS_SUCCESS:
      return onFetchSuccess(state, payload);

    case FETCH_ADDRESS_ERROR:
      return onFetchError(state, payload);
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

//SAGAS

/**
 *
 * @param {*} api
 * In here we call the api and dispatch either a succes or error action
 */
export function* getAddressWorker(api, action) {
  console.log('action', action);
  const url = `json?input=${encodeURIComponent(action.query)}&key=${GOOGLE_MAPS_KEY}`;
  console.log('url');
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
export const getCurrentDestionation = (state) => state.home;
