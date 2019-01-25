import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';
import NotFoundPage from '../../NotFoundPage';
import PlayerPage from '../../PlayerPage';
import App from '../index';

describe('App', () => {
  it('invalid path should redirect to 404', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/invalid-uri']}>
        <App />
      </MemoryRouter>,
    );
    expect(wrapper.find(PlayerPage)).toHaveLength(0);
    expect(wrapper.find(NotFoundPage)).toHaveLength(1);
  });

  it('valid path should not redirect to 404', () => {
    const mockStore = configureMockStore();
    const store = mockStore({
      player: {
        items: [],
        loading: true,
        activeItem: null,
        error: null,
      },
    });

    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>,
    );
    expect(wrapper.find(PlayerPage)).toHaveLength(1);
    expect(wrapper.find(NotFoundPage)).toHaveLength(0);
  });
});
