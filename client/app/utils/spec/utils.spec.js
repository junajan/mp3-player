import { formatTimeDefault, formatTime } from '../utils';

describe('utils', () => {
  describe('date format', () => {
    const timestamp = 1548409656801; // unix timestamp

    it('formats date with a default format', () => {
      expect(formatTimeDefault(timestamp)).toEqual('10:47:36');
    });

    it('formats date with a custom format', () => {
      const formatter = formatTime('DD.MM.YYYY');
      expect(formatter(timestamp)).toEqual('25.01.2019');
    });
  });
});
