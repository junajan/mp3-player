import React from 'react';
import { render } from 'enzyme';
import ErrorBox from '../index';

describe('Error box', () => {
  it('should display error message', () => {
    const component = render(
      <ErrorBox message="error text" onClose={() => {}} />,
    );

    expect(component.find('span.error-message').html()).toEqual('error text');
  });
});
