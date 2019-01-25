import _ from 'lodash';
import {
  FETCH_SONGS_PENDING,
  FETCH_SONGS_FULFILLED,
  FETCH_SONGS_REJECTED,
  FETCH_SONGS_ERROR_CLOSE,
  PLAY_SONG,
} from '../actions/playerActions';

const init = {
  items: [],
  loading: true,
  activeItem: null,
  error: null,
};

function playerReducer(state = init, action) {
  switch (action.type) {
    case PLAY_SONG:
      return {
        ...state,
        activeItem: _.pick(action.payload, ['id', 'name', 'sourceUrl']),
      };
    case FETCH_SONGS_PENDING:
      return {
        ...state,
        items: [],
        loading: true,
        error: null,
      };
    case FETCH_SONGS_FULFILLED:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case FETCH_SONGS_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        items: [],
      };
    case FETCH_SONGS_ERROR_CLOSE:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

export default playerReducer;
