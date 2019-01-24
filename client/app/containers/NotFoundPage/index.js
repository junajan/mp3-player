import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <Typography variant="h3" component="h2">
      Error 404
    </Typography>
    <br />
    <Typography variant="subtitle2">
      The requested page was not found ..
      <br />
      Here you can go to the <Link to="/">homepage</Link>.
    </Typography>
  </div>
);

export default NotFound;
