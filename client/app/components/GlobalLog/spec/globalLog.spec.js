import React from 'react';
import { render } from 'enzyme';
import GlobalLog from '../index';

describe('Global log', () => {
  it('should display empty log message', () => {
    const component = render(<GlobalLog logs={[]} />);
    expect(component.find('span').html()).toEqual('No logs');
  });

  it('should display two log messages', () => {
    const logs = [
      {
        id: 1,
        createdAt: 123,
        name: 'abcd',
        eventName: 'Event 123',
      },
      {
        id: 2,
        createdAt: 45678,
        name: 'efgh',
        eventName: 'Event 123',
      },
    ];
    const component = render(<GlobalLog logs={logs} />);
    expect(component.find('span').length).toEqual(2);
    expect(component.find('span').html()).toEqual('01:00:00 | Event 123: abcd');
    expect(
      component
        .find('span')
        .last()
        .html(),
    ).toEqual('01:00:45 | Event 123: efgh');
  });
});
