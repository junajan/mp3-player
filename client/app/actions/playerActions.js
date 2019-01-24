import fetch from 'cross-fetch';

const SONGS_URL = `${process.env.API_URL}/songs`;

/**
 * Action names
 */
export const PLAY_SONG = 'PLAY_SONG';
export const FETCH_SONGS_PENDING = 'FETCH_SONGS_PENDING';
export const FETCH_SONGS_REJECTED = 'FETCH_SONGS_REJECTED';
export const FETCH_SONGS_FULFILLED = 'FETCH_SONGS_FULFILLED';
export const FETCH_SONGS_ERROR_CLOSE = 'FETCH_SONGS_ERROR_CLOSE';

export const closeErrorMessage = () => ({
  type: FETCH_SONGS_ERROR_CLOSE,
});

export const playSong = payload => ({
  type: PLAY_SONG,
  payload,
});

export function fetchSongs() {
  return {
    type: 'FETCH_SONGS',
    payload: fetch(SONGS_URL)
      .then(res => res.json())
      .then(resJson => {
        if (resJson.error) throw new Error(resJson.error);
        return resJson;
      }),
  };
}
