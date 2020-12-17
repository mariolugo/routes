import { Record, Map } from 'immutable';

// Since we are using immutable, we are going to create the home record,
// used first on the initial state and then on the reuxers

export const HomeData = Record({
  routes: new Map(),
  origin: {
    selected: null,
    coordinates: null,
    fetching: false,
    results: new Map(),
  },
  destination: {
    selected: null,
    coordinates: null,
    fetching: false,
    results: new Map(),
  },
  highlight: 0,
  orderBy: 'KM',
});
