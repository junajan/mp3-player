import * as constants from '../../constants';

const styles = () => ({
  '@global': {
    html: {
      height: '100%',
      width: '100%',
    },
    body: {
      height: '100%',
      width: '100%',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    },
    '#app': {
      backgroundColor: '#fafafa',
      minHeight: '100%',
      minWidth: '100%',
    },
    '.max-width': {
      maxWidth: constants.PAGE_MAX_WIDTH,
      margin: '0px auto',
      width: '100%',
    },
  },
  content: {
    padding: 20,
  },
});

export default styles;
