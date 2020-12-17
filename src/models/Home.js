import { Record } from 'immutable';

// Since we are using immutable, we are going to create the home record,
// used first on the initial state and then on the reuxers

export const HomeData = Record({
  routes: [],
  origin: {
    selected: null,
    coordinates: null,
    fetching: false,
    results: [],
  },
  destination: {
    selected: null,
    coordinates: null,
    fetching: false,
    results: [],
  },
  highlight: 0,
  orderBy: 'KM',
});
