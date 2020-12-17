import { runSaga } from 'redux-saga';
import api from '../../../api';

import { getHomeWorker, fetchHomesSuccess, fetchHomesError } from '../';

describe('Test Saga', () => {
  it('should call api and dispatch success action', async () => {
    const dummyHomes = {
      data: {
        homes: [{ name: 'Home 1' }],
      },
    };
    const requestHomes = jest
      .spyOn(api, 'get')
      .mockImplementation(() => Promise.resolve(dummyHomes));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      getHomeWorker,
      api,
    );

    expect(requestHomes).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      fetchHomesSuccess({
        ...dummyHomes.data,
      }),
    ]);
    requestHomes.mockClear();
  });

  it('should call api and dispatch error action', async () => {
    const requestHomes = jest.spyOn(api, 'get').mockImplementation(() => Promise.reject());
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      getHomeWorker,
      api,
    );

    expect(requestHomes).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([fetchHomesError()]);
    requestHomes.mockClear();
  });
});
