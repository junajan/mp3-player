import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import PlayerPage from '../index';

jest.mock('axios');

describe('PlayerPage', () => {
  const mockStore = configureMockStore();

  it('should successfully fetch songs', async () => {
    const getSpy = jest.spyOn(axios, 'get');
    const store = mockStore({
      player: {
        items: [],
        loading: true,
        activeItem: null,
        error: null,
      },
    });

    mount(
      <Provider store={store}>
        <PlayerPage />
      </Provider>,
    );

    expect(getSpy).toBeCalled();
  });

  // TODO add tests for page elements, rejected request, ...
});
