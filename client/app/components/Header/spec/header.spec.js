import React from 'react';
import { render } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Header from '../index';

describe('Header', () => {
  it('should display header correctly', () => {
    const component = render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>,
    );

    expect(component.html()).toContain('Audio Player');
  });
});
