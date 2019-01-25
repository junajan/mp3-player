import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../index';

describe('Error404 page', () => {
  it('should display error message', () => {
    const page = shallow(<NotFoundPage />);
    expect(page).toMatchSnapshot();
  });
});
