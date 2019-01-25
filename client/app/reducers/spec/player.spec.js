import playerReducer from '../player';
import {
  FETCH_SONGS_PENDING,
  FETCH_SONGS_FULFILLED,
  FETCH_SONGS_REJECTED,
  FETCH_SONGS_ERROR_CLOSE,
  PLAY_SONG,
} from '../../actions/playerActions';

describe('player reducer', () => {
  describe('default state', () => {
    it('should retrieve default state', () => {
      const state = playerReducer(undefined, {});
      expect(state).toEqual({
        items: [],
        loading: true,
        activeItem: null,
        error: null,
      });
    });
  });

  describe('song control', () => {
    it('should set activeItem when playing song', () => {
      const action = {
        type: PLAY_SONG,
        payload: {
          id: 1,
          name: 'SongName',
          sourceUrl: 'source-url',
        },
      };
      const state = playerReducer(undefined, action);
      expect(state).toEqual({
        items: [],
        loading: true,
        activeItem: action.payload,
        error: null,
      });
    });
  });

  describe('song loading', () => {
    it('should set loading when there is a pending request', () => {
      const action = {
        type: FETCH_SONGS_PENDING,
      };
      const state = {
        items: [],
        loading: false,
        activeItem: null,
        error: null,
      };

      const newState = playerReducer(state, action);
      expect(newState).toEqual({
        items: [],
        loading: true,
        activeItem: null,
        error: null,
      });
    });

    it('should set items when request was fulfilled', () => {
      const action = {
        type: FETCH_SONGS_FULFILLED,
        payload: [1, 2, 3, 4],
      };
      const newState = playerReducer(undefined, action);
      expect(newState).toEqual({
        items: action.payload,
        loading: false,
        activeItem: null,
        error: null,
      });
    });

    it('should set error when request was rejected', () => {
      const action = {
        type: FETCH_SONGS_REJECTED,
        payload: {
          message: 'Error while fetching songs',
        },
      };

      const newState = playerReducer(undefined, action);
      expect(newState).toEqual({
        items: [],
        loading: false,
        activeItem: null,
        error: action.payload.message,
      });
    });

    it('should remove error when clicked', () => {
      const action = {
        type: FETCH_SONGS_ERROR_CLOSE,
      };

      const state = {
        items: [],
        loading: false,
        activeItem: null,
        error: 'Error while fetching songs',
      };

      const newState = playerReducer(state, action);
      expect(newState).toEqual({
        items: [],
        loading: false,
        activeItem: null,
        error: null,
      });
    });
  });
});
